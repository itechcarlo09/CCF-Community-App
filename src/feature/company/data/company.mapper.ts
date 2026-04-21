import { formatCompleteName } from "src/utils/stringUtils";
import {
	CompaniesItemDTO,
	CompanyDTO,
	EmployeesItemDTO,
} from "../model/Company";
import { CompanyItemUI, EmployeeItemUI } from "../model/CompanyListUI";

export const mapCompanyToUI = (company: CompaniesItemDTO): CompanyItemUI => {
	return {
		id: company.id,
		name: company.name,
		address: company.address,
		logo: "",
		employeeCount: company.employedCount,
		pastCount: company.formerEmployeeCount,
	};
};

export const mapEmployeesToUI = (
	employee: EmployeesItemDTO,
): EmployeeItemUI => {
	return {
		id: employee.id,
		fullName: formatCompleteName(
			employee.firstName,
			employee.middleName ?? "",
			employee.lastName,
		),
	};
};
