import { eventDataSource } from "./eventDataSource";

export const eventRepository = {
	// getEventById: eventDataSource.get,
	getEvents: eventDataSource.getEvents,
	// addEvent: eventDataSource.add,
	// updateEvent: eventDataSource.update,
	// deleteEvent: eventDataSource.delete,
};
