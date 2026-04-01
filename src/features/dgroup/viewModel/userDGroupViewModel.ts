import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { DGroupDTO } from "../model/DGroup";
import { DGroupItemUI } from "../model/DGroupItemUI";
import { dgroupRepository } from "../data/dgroupRepository";
import { mapDGroupToUI } from "../data/dgroup.mapper";

const PAGE_SIZE = 10;

// 🔥 Types
type DGroupsPage = {
	data: DGroupItemUI[];
	hasMore: boolean;
};

type InfiniteDGroupsData = {
	pages: DGroupsPage[];
	pageParams: number[];
};

export const useDGroupViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 QUERY (Infinite + Search ready)
	const query = useInfiniteQuery<
		DGroupsPage,
		Error,
		InfiniteData<DGroupsPage>,
		["dgroups", string],
		number
	>({
		queryKey: ["dgroups", search],

		queryFn: async ({ pageParam }): Promise<DGroupsPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "name",
			};

			// 🔥 Replace when search API is ready
			const result = isSearching
				? await dgroupRepository.searchDGroups?.({
						name: search,
						...baseParams,
				  })
				: await dgroupRepository.getDGroups(baseParams);

			return {
				data: result?.data.map(mapDGroupToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten
	const dgroups = useMemo<DGroupItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD (optional, future-proof)
	const addDGroupMutation = useMutation({
		mutationFn: (data: Omit<DGroupDTO, "id">) =>
			dgroupRepository.addDGroup?.(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dgroups"] });
		},
	});

	// 🔽 UPDATE (Optimistic ready)
	const updateDGroupMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<DGroupDTO> },
		{ previous?: InfiniteDGroupsData }
	>({
		mutationFn: ({ id, data }) => dgroupRepository.updateDGroup?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ["dgroups", search] });

			const previous = queryClient.getQueryData<InfiniteDGroupsData>([
				"dgroups",
				search,
			]);

			queryClient.setQueryData<InfiniteDGroupsData>(
				["dgroups", search],
				(old) => {
					if (!old) return old;

					return {
						...old,
						pages: old.pages.map((page) => ({
							...page,
							data: page.data.map((d) =>
								d.id.toString() === id ? { ...d, ...data } : d,
							),
						})),
					};
				},
			);

			return { previous };
		},

		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["dgroups", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["dgroups"] });
		},
	});

	// 🔽 GET SINGLE
	const getDGroup = async (id: string): Promise<DGroupDTO | null> => {
		try {
			return await dgroupRepository.getDGroupById?.(id);
		} catch (error) {
			console.error("Error fetching dgroup:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchDGroups = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreDGroups = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshDGroups = () => {
		query.refetch();
	};

	return {
		dgroups,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addDGroup: addDGroupMutation.mutateAsync,
		updateDGroup: (id: string, data: Partial<DGroupDTO>) =>
			updateDGroupMutation.mutateAsync({ id, data }),

		searchDGroups,
		getDGroup,
		refresh: refreshDGroups,
		loadMoreDGroups,
		hasMore: query.hasNextPage,
	};
};
