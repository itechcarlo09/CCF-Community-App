export enum GradeYear {
	PreSchool = "Pre-School",
	Kindergarten = "Kindergarten",
	Grade1 = "Grade 1",
	Grade2 = "Grade 2",
	Grade3 = "Grade 3",
	Grade4 = "Grade 4",
	Grade5 = "Grade 5",
	Grade6 = "Grade 6",
	Grade7 = "Grade 7",
	Grade8 = "Grade 8",
	Grade9 = "Grade 9",
	Grade10 = "Grade 10",
	Grade11 = "Grade 11",
	Grade12 = "Grade 12",
	FirstYearCollege = "First Year College",
	SecondYearCollege = "Second Year College",
	ThirdYearCollege = "Third Year College",
	FourthYearCollege = "Fourth Year College",
	FifthYearCollege = "Fifth Year College",
	UnderGraduate = "Undergraduate",
	Graduated = "Graduated",
	Masteral = "Masteral",
	Others = "Others",
}

export default GradeYear;

export const gradeYearOptions = Object.values(GradeYear).map((v) => ({
	label: v.replace(/([A-Z])/g, " $1").trim(),
	value: v,
}));
