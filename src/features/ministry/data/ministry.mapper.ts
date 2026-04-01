import { MinistryDTO } from "../model/Ministry";
import { MinistryItemUI } from "../model/MinistryListItem";

export const mapMinistryToUI = (ministry: MinistryDTO): MinistryItemUI => {
	return {
		id: ministry.id,
		name: ministry.name,
		icon: "", // TODO
		ministryHead: "Carlo Renoria", // TODO: dynamic
		mission: ministry.mission,
		vision: ministry.vision,
		description: ministry.description,
		activeVolunteer: 25, // TODO
		priorityVolunteer: 10, // TODO
	};
};
