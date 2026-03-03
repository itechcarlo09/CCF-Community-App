import { useState } from "react";
import { formatFullName } from "../../../utils/stringUtils";
import { Event } from "../../event/model/Event";
import { eventRepository } from "../../event/data/eventRepository";
import { EventItemUI } from "../../event/model/EventListItem";

const mapEventToUI = (event: Event): EventItemUI => {
	const ministryText = "B1G Singles Ministry";
	const date = new Date(event.date);
	const eventTitle = event.eventName;
	const location = event.location;
	const speakers = Array.isArray(event.speaker)
		? event.speaker
				.map((s) => formatFullName(s.firstName, s.lastName, s.middleName))
				.join(", ")
		: formatFullName(
				event.speaker.firstName,
				event.speaker.lastName,
				event.speaker.middleName,
		  );

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
			console.log("Fetching events...");
			const result = await eventRepository.getEvents();
			setEvents(result.map(mapEventToUI));
		} catch (error) {
			console.error("Error fetching events:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		events,
		loading,
		refresh: fetchEvents,
		fetchEvents,
	};
};
