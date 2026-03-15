import { useState } from "react";
import { formatFullName } from "../../../utils/stringUtils";
import { Event } from "../../event/model/Event";
import { eventRepository } from "../../event/data/eventRepository";
import { EventItemUI } from "../../event/model/EventListItem";

const mapEventToUI = (event: Event): EventItemUI => {
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
	const [loading, setLoading] = useState<boolean>(false);

	const fetchEvents = async () => {
		try {
			setLoading(true);
			const result = await eventRepository.getEvents();
			setEvents(result.map(mapEventToUI));
		} catch (error) {
			console.error("Error fetching events:", error);
		} finally {
			setLoading(false);
		}
	};

	const searchEvents = async (searchText: string) => {
		try {
			setLoading(true);
			if (searchText.trim() === "") {
				await fetchEvents();
				return;
			}
			const result = await eventRepository.searchEvents(searchText);
			setEvents(result.map(mapEventToUI));
		} catch (error) {
			console.error("Error searching events:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		events,
		loading,
		refresh: fetchEvents,
		fetchEvents,
		searchEvents,
	};
};
