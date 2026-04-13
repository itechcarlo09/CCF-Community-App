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

export const mapEmployeesToUI = (student: EmployeesItemDTO): EmployeeItemUI => {
	return {
		id: student.id,
		fullName: formatCompleteName(
			student.firstName,
			student.middleName ?? "",
			student.lastName,
		),
	};
};
