import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { MinistryItemUI } from "../model/MinistryListItem";
import { MinistryDTO } from "../model/Ministry";
import { ministryRepository } from "../data/MinistryRepository";

const PAGE_SIZE = 10;

// 🔥 Types
type MinistriesPage = {
	data: MinistryItemUI[];
	hasMore: boolean;
};

type InfiniteMinistriesData = {
	pages: MinistriesPage[];
	pageParams: number[];
};

// 🔽 Mapper
const mapMinistryToUI = (ministry: MinistryDTO): MinistryItemUI => {
	return {
		id: ministry.id,
		name: ministry.name,
		icon: "",
		ministryHead: "Carlo Renoria", // TODO: dynamic
		mission: ministry.mission,
		vision: ministry.vision,
		description: ministry.description,
		activeVolunteer: 25, // TODO
		priorityVolunteer: 10, // TODO
	};
};

export const useMinistryViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		MinistriesPage,
		Error,
		InfiniteData<MinistriesPage>,
		["ministries", string],
		number
	>({
		queryKey: ["ministries", search],

		queryFn: async ({ pageParam }): Promise<MinistriesPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "name",
			};

			const result = isSearching
				? await ministryRepository.searchMinistries?.({
						name: search,
						...baseParams,
				  })
				: await ministryRepository.getMinistries(baseParams);

			return {
				data: result?.data.map(mapMinistryToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten
	const ministries = useMemo<MinistryItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD
	const addMinistryMutation = useMutation({
		mutationFn: (data: Omit<MinistryDTO, "id">) =>
			ministryRepository.addMinistry?.(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ministries"] });
		},
	});

	// 🔽 UPDATE (Optimistic)
	const updateMinistryMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<MinistryDTO> },
		{ previous?: InfiniteMinistriesData }
	>({
		mutationFn: ({ id, data }) => ministryRepository.updateMinistry?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({
				queryKey: ["ministries", search],
			});

			const previous = queryClient.getQueryData<InfiniteMinistriesData>([
				"ministries",
				search,
			]);

			queryClient.setQueryData<InfiniteMinistriesData>(
				["ministries", search],
				(old) => {
					if (!old) return old;

					return {
						...old,
						pages: old.pages.map((page) => ({
							...page,
							data: page.data.map((m) =>
								m.id.toString() === id ? { ...m, ...data } : m,
							),
						})),
					};
				},
			);

			return { previous };
		},

		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["ministries", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["ministries"] });
		},
	});

	// 🔽 GET SINGLE
	const getMinistry = async (id: string): Promise<MinistryDTO | null> => {
		try {
			return await ministryRepository.getMinistryById?.(id);
		} catch (error) {
			console.error("Error fetching ministry:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchMinistries = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreMinistries = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshMinistries = () => {
		query.refetch();
	};

	return {
		ministries,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addMinistry: addMinistryMutation.mutateAsync,
		updateMinistry: (id: string, data: Partial<MinistryDTO>) =>
			updateMinistryMutation.mutateAsync({ id, data }),

		searchMinistries,
		getMinistry,
		refresh: refreshMinistries,
		loadMoreMinistries,
		hasMore: query.hasNextPage,
	};
};
