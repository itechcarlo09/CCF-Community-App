export interface EmploymentResponseDTO {
	id: number;
	schoolId: number;
	accountId: number;
	position: string;
	startDate: Date;
	endDate?: Date;
	createdAt: Date;
	updatedAt?: Date;
}

export interface EmploymentGetResponseDTO {
	startDate: Date;
	company: CompanyGetResponseDTO;
	endDate?: Date;
	position: string;
}

interface CompanyGetResponseDTO {
	id: number;
	name: string;
	acronym?: string;
}
