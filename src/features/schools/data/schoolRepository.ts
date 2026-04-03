import { schoolDataSource } from "./schoolDataSource";

export const schoolRepository = {
	getSchools: schoolDataSource.getSchools,
	getSchoolById: schoolDataSource.getSchoolById,
	// searchEvents: eventDataSource.searchEvents,
	addSchool: schoolDataSource.addSchool,
	updateSchool: schoolDataSource.updateSchool,
	// deleteEvent: eventDataSource.delete,
};
