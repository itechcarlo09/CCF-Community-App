import { DGroupListItemDTO } from "../../../features/dgroup/model/DGroup";
import { DGroupItemUI } from "../../../features/dgroup/model/DGroupItemUI";

export const mapDGroupToUI = (dgroup: DGroupListItemDTO): DGroupItemUI => {
	const leadersName = dgroup.leaders
		.map((leader) => `${leader.firstName} ${leader.lastName}`)
		.join(", ");

	const gender =
		dgroup.leaders.length === 2 ? "Couples" : dgroup.leaders[0]?.gender;

	return {
		id: dgroup.id,
		groupName: dgroup.name,
		leadersName,
		memberCount: dgroup.members,
		leaderImageUrl: "", // TODO
		leaderProfileUrl: "", // TODO
		memberTypes: dgroup.lifestage,
		gender,
	};
};
