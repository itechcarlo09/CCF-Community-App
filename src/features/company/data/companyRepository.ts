import { companyDataSource } from "./companyDataSource";

export const companyRepository = {
	// getEventById: ministryDataSource.getEventById,
	getCompanies: companyDataSource.getCompanies,
	// searchEvents: eventDataSource.searchEvents,
	addCompany: companyDataSource.addCompany,
	// updateEvent: eventDataSource.update,
	// deleteEvent: eventDataSource.delete,
};
