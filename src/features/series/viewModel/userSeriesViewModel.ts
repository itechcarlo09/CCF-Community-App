import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { SeriesItemUI } from "../model/SeriesItemUI";
import { SeriesDTO } from "../model/Series";
import { seriesRepository } from "../data/seriesRepository";
import { mapSeriesToUI } from "../data/series.mapper";

const PAGE_SIZE = 10;

// 🔥 Types
type SeriesPage = {
	data: SeriesItemUI[];
	hasMore: boolean;
};

type InfiniteSeriesData = {
	pages: SeriesPage[];
	pageParams: number[];
};

export const useSeriesViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		SeriesPage,
		Error,
		InfiniteData<SeriesPage>,
		["series", string],
		number
	>({
		queryKey: ["series", search],

		queryFn: async ({ pageParam }): Promise<SeriesPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "name",
			};

			const result = isSearching
				? await seriesRepository.searchSeries?.({
						name: search,
						...baseParams,
				  })
				: await seriesRepository.getSeries();

			return {
				data: result?.data.map(mapSeriesToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten
	const seriesList = useMemo<SeriesItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD SERIES
	const addSeriesMutation = useMutation({
		mutationFn: (data: Omit<SeriesDTO, "id">) =>
			seriesRepository.addSeries?.(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["series"] });
		},
	});

	// 🔽 UPDATE (Optimistic)
	const updateSeriesMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<SeriesDTO> },
		{ previous?: InfiniteSeriesData }
	>({
		mutationFn: ({ id, data }) => seriesRepository.updateSeries?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ["series", search] });

			const previous = queryClient.getQueryData<InfiniteSeriesData>([
				"series",
				search,
			]);

			queryClient.setQueryData<InfiniteSeriesData>(
				["series", search],
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
				queryClient.setQueryData(["series", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["series"] });
		},
	});

	// 🔽 GET SINGLE
	const getSeries = async (id: string): Promise<SeriesDTO | null> => {
		try {
			return await seriesRepository.getSeriesById?.(id);
		} catch (error) {
			console.error("Error fetching series:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchSeries = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreSeries = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshSeries = () => {
		query.refetch();
	};

	return {
		series: seriesList,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addSeries: addSeriesMutation.mutateAsync,
		updateSeries: (id: string, data: Partial<SeriesDTO>) =>
			updateSeriesMutation.mutateAsync({ id, data }),

		searchSeries,
		getSeries,
		refresh: refreshSeries,
		loadMoreSeries,
		hasMore: query.hasNextPage,
	};
};
