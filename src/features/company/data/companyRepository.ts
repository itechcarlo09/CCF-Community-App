import { companyDataSource } from "./companyDataSource";

export const companyRepository = {
	getCompanyById: companyDataSource.getCompanyById,
	getCompanies: companyDataSource.getCompanies,
	// searchEvents: eventDataSource.searchEvents,
	addCompany: companyDataSource.addCompany,
	updateCompany: companyDataSource.updateCompany,
	// deleteEvent: eventDataSource.delete,
};
