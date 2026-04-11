export interface CreateEmploymentDTO {
	companyId: number;
	position: string;
	startDate: Date;
	endDate: Date | null;
}

export interface CreateEmploymentListDTO {
	accountId: number;
	employments: CreateEmploymentDTO[];
}
