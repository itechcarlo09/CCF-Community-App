import { LifeStage } from "src/types/enums/LifeStage";
import { LeaderDTO } from "./DGroup";
import { Gender } from "src/types/enums/Gender";

export interface DGroupItemUI {
	id: number;
	groupName: string;
	leadersName: string;
	memberCount: number;
	leaderImageUrl?: string;
	leaderProfileUrl?: string;
	memberTypes: LifeStage[];
	gender: Gender | "Couples";
}
