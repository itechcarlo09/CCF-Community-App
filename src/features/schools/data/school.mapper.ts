import { SchoolDTO } from "../model/School";
import { SchoolItemUI } from "../model/SchoolListItem";

export const mapSchoolToUI = (school: SchoolDTO): SchoolItemUI => {
	return {
		id: school.id,
		name: school.name,
		location: school.address,
		acronym: school.acronym,
		currentCount: 0,
		alumniCount: 0,
	};
};
