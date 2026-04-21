import EducationLevel from "src/types/enums/EducationLevel";

export interface CreateEducationDTO {
	schoolId: number;
	educationLevel: EducationLevel;
	course?: string;
	startDate: Date;
	endDate: Date | null;
}

export interface CreateEducationListDTO {
	accountId: number;
	educations: CreateEducationDTO[];
}
