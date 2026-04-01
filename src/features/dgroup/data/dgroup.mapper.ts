import { DGroupDTO } from "../model/DGroup";
import { DGroupItemUI } from "../model/DGroupItemUI";

export const mapDGroupToUI = (dgroup: DGroupDTO): DGroupItemUI => {
	const getMemberTypes = (count: number) => {
		return count % 2 !== 0 ? ["Couple"] : ["Elevate", "B1G"];
	};

	return {
		id: dgroup.id,
		groupName: dgroup.name,
		leaderName: "DLeaders Name", // TODO: replace with real data
		memberCount: 0, // TODO
		leaderImageUrl: "", // TODO
		leaderProfileUrl: "", // TODO
		memberTypes: getMemberTypes(dgroup.id),
	};
};
