import { formatCompleteName, formatFullName } from "src/utils/stringUtils";
import { SchoolListItemDTO, StudentListItemDTO } from "../model/School";
import { SchoolItemUI, StudentItemUI } from "../model/SchoolListItem";

export const mapSchoolToUI = (school: SchoolListItemDTO): SchoolItemUI => {
	return {
		id: school.id,
		name: school.name,
		location: school.address,
		acronym: school.acronym ?? "",
		currentCount: school.enrolledStudentCount,
		alumniCount: school.alumniStudentCount,
	};
};

export const mapStudentsToUI = (student: StudentListItemDTO): StudentItemUI => {
	return {
		id: student.id,
		fullName: formatCompleteName(
			student.firstName,
			student.middleName ?? "",
			student.lastName,
		),
	};
};
