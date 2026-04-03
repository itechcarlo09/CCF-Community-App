import { SchoolListItemDTO } from "../model/School";
import { SchoolItemUI } from "../model/SchoolListItem";

export const mapSchoolToUI = (school: SchoolListItemDTO): SchoolItemUI => {
	return {
		id: school.id,
		name: school.name,
		location: school.address,
		acronym: school.acronym,
		currentCount: school.activeEducationCount,
		alumniCount: school.completedEducationCount,
	};
};
