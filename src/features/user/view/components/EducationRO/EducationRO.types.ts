export interface EducationProps {
	school: string;
	degree: string;
	startYear: string;
	endYear: string;
}

export interface EducationROProps {
	educations: EducationProps[];
}
