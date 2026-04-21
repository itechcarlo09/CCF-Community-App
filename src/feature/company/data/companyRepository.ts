import { companyDataSource } from "./companyDataSource";

export const companyRepository = {
	getCompanyById: companyDataSource.getCompanyById,
	getCompanies: companyDataSource.getCompanies,
	getEmployees: companyDataSource.getEmployees,
	// searchEvents: eventDataSource.searchEvents,
	addCompany: companyDataSource.addCompany,
	updateCompany: companyDataSource.updateCompany,
	// deleteEvent: eventDataSource.delete,
};
