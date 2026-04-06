export enum EducationLevel {
	JuniorHigh = "Junior High",
	SeniorHigh = "Senior High",
	College = "College",
	Masteral = "Masteral",
	Doctoral = "Doctoral",
}

export default EducationLevel;

export const gradeYearOptions = Object.values(EducationLevel).map((v) => ({
	label: v.replace(/([A-Z])/g, " $1").trim(),
	value: v,
}));
