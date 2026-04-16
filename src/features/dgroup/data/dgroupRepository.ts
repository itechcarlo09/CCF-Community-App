import { dgroupDataSource } from "./dgroupDataResource";

export const dgroupRepository = {
	getDGroupById: dgroupDataSource.getDGroupById,
	getDGroups: dgroupDataSource.getDGroups,
	// searchEvents: eventDataSource.searchEvents,
	// addEvent: eventDataSource.add,
	// updateEvent: eventDataSource.update,
	// deleteEvent: eventDataSource.delete,
};
