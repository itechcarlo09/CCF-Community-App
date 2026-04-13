export interface CompanyItemUI {
	id: number;
	name: string;
	acronym?: string;
	logo?: string;
	address: string;
	employeeCount: number;
	pastCount: number;
}

export interface EmployeeItemUI {
	id: number;
	fullName: string;
}
