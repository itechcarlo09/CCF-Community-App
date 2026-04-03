import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { CreateSchoolDTO, SchoolDTO, SchoolListItemDTO } from "../model/School";
import { SchoolItemUI } from "../model/SchoolListItem";
import { schoolRepository } from "../data/schoolRepository";
import { mapSchoolToUI } from "../data/school.mapper";
import { PAGE_SIZE } from "src/types/globalTypes";

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
				skip: (pageParam - 1) * PAGE_SIZE,
				take: PAGE_SIZE,
			};

			const result = await schoolRepository.getSchools?.({
				...(isSearching && { search }),
				...baseParams,
			});

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
		mutationFn: (data: CreateSchoolDTO) => schoolRepository.addSchool(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["schools"] });
		},
	});

	// 🔽 UPDATE (Optimistic)
	const updateSchoolMutation = useMutation<
		void,
		Error,
		{ id: number; data: Partial<SchoolListItemDTO> },
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
								s.id === id ? ({ ...s, ...data } as SchoolItemUI) : s,
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
	const getSchool = async (id: number): Promise<SchoolDTO | null> => {
		try {
			const school = await schoolRepository.getSchoolById?.(id);
			return school ?? null;
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
		updateSchool: (id: number, data: Partial<CreateSchoolDTO>) =>
			updateSchoolMutation.mutateAsync({ id, data }),

		searchSchools,
		getSchool,
		refresh: refreshSchools,
		loadMoreSchools,
		hasMore: query.hasNextPage,
	};
};
