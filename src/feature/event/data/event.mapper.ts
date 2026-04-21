import { EventDTO } from "../model/Event";
import { EventItemUI } from "../model/EventListItem";

export const mapEventToUI = (event: EventDTO): EventItemUI => {
	return {
		id: event.id,
		ministryText: ["B1G Singles Ministry"],
		eventTitle: event.eventName,
		seriesTitle: event.series.name,
		location: event.location,
		date: new Date(event.eventDate),
		speakers: event.eventSpeakers.map((s) => s.speaker.name).join(", "),
		firstTimeAttendees: 1,
		volunteers: 12,
		regularAttendees: 1,
	};
};
