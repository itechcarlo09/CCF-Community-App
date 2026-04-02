import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { SpeakerDTO } from "../model/Speaker";
import { SpeakerItemUI } from "../model/SpeakerItemUI";
import { mapSpeakerToUI } from "../data/speaker.mapper";
import { speakersRepository as speakerRepository } from "../data/speakerRepository";

const PAGE_SIZE = 10;

// 🔥 Types
type SpeakersPage = {
	data: SpeakerItemUI[];
	hasMore: boolean;
};

type InfiniteSpeakersData = {
	pages: SpeakersPage[];
	pageParams: number[];
};

export const useSpeakerViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		SpeakersPage,
		Error,
		InfiniteData<SpeakersPage>,
		["speakers", string],
		number
	>({
		queryKey: ["speakers", search],

		queryFn: async ({ pageParam }): Promise<SpeakersPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "name",
			};

			const result = isSearching
				? await speakerRepository.searchSpeakers?.({
						name: search,
						...baseParams,
				  })
				: await speakerRepository.getSpeakers(baseParams);

			return {
				data: result?.data.map(mapSpeakerToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten
	const speakers = useMemo<SpeakerItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD
	const addSpeakerMutation = useMutation({
		mutationFn: (data: Omit<SpeakerDTO, "id">) =>
			speakerRepository.addSpeaker?.(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["speakers"] });
		},
	});

	// 🔽 UPDATE (Optimistic)
	const updateSpeakerMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<SpeakerDTO> },
		{ previous?: InfiniteSpeakersData }
	>({
		mutationFn: ({ id, data }) => speakerRepository.updateSpeaker?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({
				queryKey: ["speakers", search],
			});

			const previous = queryClient.getQueryData<InfiniteSpeakersData>([
				"speakers",
				search,
			]);

			queryClient.setQueryData<InfiniteSpeakersData>(
				["speakers", search],
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
				queryClient.setQueryData(["speakers", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["speakers"] });
		},
	});

	// 🔽 GET SINGLE
	const getSpeaker = async (id: string): Promise<SpeakerDTO | null> => {
		try {
			return await speakerRepository.getSpeakerById?.(id);
		} catch (error) {
			console.error("Error fetching speaker:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchSpeakers = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreSpeakers = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshSpeakers = () => {
		query.refetch();
	};

	return {
		speakers,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addSpeaker: addSpeakerMutation.mutateAsync,
		updateSpeaker: (id: string, data: Partial<SpeakerDTO>) =>
			updateSpeakerMutation.mutateAsync({ id, data }),

		searchSpeakers,
		getSpeaker,
		refresh: refreshSpeakers,
		loadMoreSpeakers,
		hasMore: query.hasNextPage,
	};
};
