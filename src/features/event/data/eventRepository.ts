import { eventDataSource } from "./eventDataSource";

export const eventRepository = {
	getEventById: eventDataSource.getEventById,
	getEvents: eventDataSource.getEvents,
	searchEvents: eventDataSource.searchEvents,
	// addEvent: eventDataSource.add,
	// updateEvent: eventDataSource.update,
	// deleteEvent: eventDataSource.delete,
};
