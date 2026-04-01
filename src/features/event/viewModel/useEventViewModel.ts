import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { eventRepository } from "../data/eventRepository";
import { EventDTO } from "../model/Event";
import { EventItemUI } from "../model/EventListItem";

// 🔥 Types
type EventsPage = {
	data: EventItemUI[];
	hasMore: boolean;
};

type InfiniteEventsData = {
	pages: EventsPage[];
	pageParams: number[];
};

const PAGE_SIZE = 10;

// 🔽 Mapper
const mapEventToUI = (event: EventDTO): EventItemUI => {
	return {
		id: event.id,
		ministryText: ["B1G Singles Ministry"],
		eventTitle: event.eventName,
		seriesTitle: event.series.name,
		location: event.location,
		date: new Date(event.eventDate),
		speakers: event.eventSpeakers.map((s) => s.speaker.name).join(", "),
		firstTimeAttendees: 1,
		regularAttendees: 1,
	};
};

export const useEventViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 EVENTS QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		EventsPage,
		Error,
		InfiniteData<EventsPage>,
		["events", string],
		number
	>({
		queryKey: ["events", search],

		queryFn: async ({ pageParam }): Promise<EventsPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "date",
			};

			const result = isSearching
				? await eventRepository.searchEvents({
						name: search,
						...baseParams,
				  })
				: await eventRepository.getEvents(baseParams);

			return {
				data: result?.data.map(mapEventToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten pages
	const events = useMemo<EventItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD EVENT
	const addEventMutation = useMutation({
		mutationFn: (event: Omit<EventDTO, "id">) =>
			eventRepository.addEvent(event),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});

	// 🔽 UPDATE EVENT (Optimistic)
	const updateEventMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<EventDTO> },
		{ previous?: InfiniteEventsData }
	>({
		mutationFn: ({ id, data }) => eventRepository.updateEvent(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ["events", search] });

			const previous = queryClient.getQueryData<InfiniteEventsData>([
				"events",
				search,
			]);

			queryClient.setQueryData<InfiniteEventsData>(
				["events", search],
				(old) => {
					if (!old) return old;

					return {
						...old,
						pages: old.pages.map((page) => ({
							...page,
							data: page.data.map((e) =>
								e.id.toString() === id ? { ...e, ...data } : e,
							),
						})),
					};
				},
			);

			return { previous };
		},

		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["events", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});

	// 🔽 GET SINGLE EVENT
	const getEvent = async (id: string): Promise<EventDTO | null> => {
		try {
			return await eventRepository.getEventById(id);
		} catch (error) {
			console.error("Error fetching event:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchEvents = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreEvents = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshEvents = () => {
		query.refetch();
	};

	return {
		events,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addEvent: addEventMutation.mutateAsync,
		updateEvent: (id: string, data: Partial<EventDTO>) =>
			updateEventMutation.mutateAsync({ id, data }),

		searchEvents,
		getEvent,
		refresh: refreshEvents,
		loadMoreEvents,
		hasMore: query.hasNextPage,
	};
};
