import { speakersDataSource } from "./speakerDataSource";

export const speakersRepository = {
	// getEventById: ministryDataSource.getEventById,
	getSpeakers: speakersDataSource.getSpeakers,
	// searchEvents: eventDataSource.searchEvents,
	// addEvent: eventDataSource.add,
	// updateEvent: eventDataSource.update,
	// deleteEvent: eventDataSource.delete,
};
