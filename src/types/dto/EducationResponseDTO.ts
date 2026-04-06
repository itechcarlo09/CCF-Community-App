import EducationLevel from "../enums/EducationLevel";

export interface EducationResponseDTO {
	id: number;
	schoolId: number;
	accountId: number;
	educationLevel: EducationLevel;
	course?: string;
	startDate: Date;
	endDate?: Date;
	createdAt: Date;
	updatedAt?: Date;
}

export interface EducationGetResponseDTO {
	startDate: Date;
	educationLevel: EducationLevel;
	school: SchoolGetResponseDTO;
	endDate?: Date;
	course?: string;
}

interface SchoolGetResponseDTO {
	id: number;
	name: string;
	acronym?: string;
}
