import { DGroupStatus } from "src/types/enums/DGroupStatus";
import { MembershipType } from "../types";
import { Gender } from "./user";

export type MemberCardModel = {
	id: number;
	fullName: string;
	membershipType: DGroupStatus;
	gender: Gender;
	priorityMinistry: string;
	latestDGroup: Date;
	latestActivity: Date;
};
