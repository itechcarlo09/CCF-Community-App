import { PaginatedResponse } from "../../../types/paginationTypes";

// export interface Speaker {
// 	id: number;
// 	name: string;
// 	accountId: number;
// 	updatedBy: Date;
// 	createdAt: Date;
// 	updatedAt: Date;
// }

export interface EmployeesItemDTO {
	id: number;
	firstName: string;
	middleName: string | null;
	lastName: string;
	profilePicture: string | null;
}

export interface CompaniesItemDTO {
	id: number;
	name: string;
	acronym: string | null;
	address: string;
	createdAt: Date;
	updatedAt: Date;
	employedCount: number;
	formerEmployeeCount: number;
}

export interface CompanyDTO {
	id: number;
	name: string;
	acronym: string;
	address: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateCompanyDTO {
	name: string;
	acronym?: string | null;
	address: string;
}
export type GetCompanyResponse = PaginatedResponse<CompanyDTO>;
