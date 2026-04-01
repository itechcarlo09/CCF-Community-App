import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { SchoolDTO } from "../model/School";
import { SchoolItemUI } from "../model/SchoolListItem";
import { schoolRepository } from "../data/schoolRepository";
import { mapSchoolToUI } from "../data/school.mapper";

const PAGE_SIZE = 10;

// 🔥 Types
type SchoolsPage = {
	data: SchoolItemUI[];
	hasMore: boolean;
};

type InfiniteSchoolsData = {
	pages: SchoolsPage[];
	pageParams: number[];
};

export const useSchoolViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		SchoolsPage,
		Error,
		InfiniteData<SchoolsPage>,
		["schools", string],
		number
	>({
		queryKey: ["schools", search],

		queryFn: async ({ pageParam }): Promise<SchoolsPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "name",
			};

			const result = isSearching
				? await schoolRepository.searchSchools?.({
						name: search,
						...baseParams,
				  })
				: await schoolRepository.getSchools(baseParams);

			return {
				data: result?.data.map(mapSchoolToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten
	const schools = useMemo<SchoolItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD
	const addSchoolMutation = useMutation({
		mutationFn: (data: Omit<SchoolDTO, "id">) =>
			schoolRepository.addSchool?.(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["schools"] });
		},
	});

	// 🔽 UPDATE (Optimistic)
	const updateSchoolMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<SchoolDTO> },
		{ previous?: InfiniteSchoolsData }
	>({
		mutationFn: ({ id, data }) => schoolRepository.updateSchool?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ["schools", search] });

			const previous = queryClient.getQueryData<InfiniteSchoolsData>([
				"schools",
				search,
			]);

			queryClient.setQueryData<InfiniteSchoolsData>(
				["schools", search],
				(old) => {
					if (!old) return old;

					return {
						...old,
						pages: old.pages.map((page) => ({
							...page,
							data: page.data.map((s) =>
								s.id.toString() === id ? { ...s, ...data } : s,
							),
						})),
					};
				},
			);

			return { previous };
		},

		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["schools", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["schools"] });
		},
	});

	// 🔽 GET SINGLE
	const getSchool = async (id: string): Promise<SchoolDTO | null> => {
		try {
			return await schoolRepository.getSchoolById?.(id);
		} catch (error) {
			console.error("Error fetching school:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchSchools = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreSchools = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshSchools = () => {
		query.refetch();
	};

	return {
		schools,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addSchool: addSchoolMutation.mutateAsync,
		updateSchool: (id: string, data: Partial<SchoolDTO>) =>
			updateSchoolMutation.mutateAsync({ id, data }),

		searchSchools,
		getSchool,
		refresh: refreshSchools,
		loadMoreSchools,
		hasMore: query.hasNextPage,
	};
};
