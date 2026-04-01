import { CompanyDTO } from "../model/Company";
import { CompanyItemUI } from "../model/CompanyListUI";

export const mapCompanyToUI = (company: CompanyDTO): CompanyItemUI => {
	return {
		id: company.id,
		name: company.name,
		address: company.address,
		logo: "",
		employeeCount: 0,
		pastCount: 0,
	};
};
