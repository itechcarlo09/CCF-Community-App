import { useEffect, useState } from "react";
import { EventDTO } from "../../event/model/Event";
import { eventRepository } from "../../event/data/eventRepository";
import { EventItemUI } from "../../event/model/EventListItem";

const PAGE_SIZE = 10;

const mapEventToUI = (event: EventDTO): EventItemUI => {
	const ministryText = "B1G Singles Ministry";
	const date = new Date(event.eventDate);
	const eventTitle = `${event.series.name}: ${event.eventName}`;
	const location = event.location;
	const speakers = event.eventSpeakers.map((s) => s.speaker.name).join(", ");

	return {
		id: event.id,
		ministryText,
		eventTitle,
		location,
		date,
		speakers,
		firstTimeAttendees: 1,
		regularAttendees: 1,
	};
};

export const useEventViewModel = () => {
	const [events, setEvents] = useState<EventItemUI[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [activityLoading, setActivityLoading] = useState(false);
	const [search, setSearch] = useState("");

	const fetchEvents = async (nextPage = page) => {
		if (activityLoading) return;
		if (!hasMore && nextPage !== 1) return;

		try {
			if (nextPage === 1) {
				setLoading(true);
			} else {
				setActivityLoading(true);
			}
			const isSearching = !!search.trim();
			const baseParams = {
				page: nextPage,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "date",
			};

			const result = isSearching
				? await eventRepository.searchEvents({ name: search, ...baseParams })
				: await eventRepository.getEvents(baseParams);

			if (!result) return;

			const mappedEvents = result.data.map(mapEventToUI);

			setEvents((prev) =>
				nextPage === 1 ? mappedEvents : [...prev, ...mappedEvents],
			);

			setPage(nextPage);
			setHasMore(result.meta.hasMore);
		} catch (error) {
			console.error("Error fetching events:", error);
		} finally {
			setLoading(false);
			setActivityLoading(false);
		}
	};

	const loadMoreEvents = () => {
		if (loading || activityLoading || !hasMore) return;

		fetchEvents(page + 1);
	};

	const searchEvents = async (searchText: string) => {
		setSearch(searchText);
		setPage(1);
		setHasMore(true);
		setEvents([]);
	};

	useEffect(() => {
		fetchEvents(1);
	}, [search]);

	return {
		events,
		loading,
		activityLoading,
		refresh: fetchEvents,
		fetchEvents,
		searchEvents,
		loadMoreEvents,
	};
};
