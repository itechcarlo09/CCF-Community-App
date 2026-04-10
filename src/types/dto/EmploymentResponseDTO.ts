export interface EmploymentResponseDTO {
	id: number;
	schoolId: number;
	accountId: number;
	course?: string;
	startDate: Date;
	endDate?: Date;
	createdAt: Date;
	updatedAt?: Date;
}

export interface EmploymentGetResponseDTO {
	startDate: Date;
	school: CompanyGetResponseDTO;
	endDate?: Date;
	course?: string;
}

interface CompanyGetResponseDTO {
	id: number;
	name: string;
	acronym?: string;
}
