export interface EducationEmploymentConfig {
	title: string; // ex: "education1"
	startYears: { label: string; value: string }[];
	endYears?: { label: string; value: string }[];
}
