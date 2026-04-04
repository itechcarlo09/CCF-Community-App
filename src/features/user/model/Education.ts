export interface CreateEducationDTO {
	accountId: number;
	schoolId: number;
	gradeYear: string;
	course?: string | null;
	startYear: number;
	endYear?: number | null;
}

export interface CreateEducationListDTO {
	accountId: number;
	educations: CreateEducationDTO[];
}
