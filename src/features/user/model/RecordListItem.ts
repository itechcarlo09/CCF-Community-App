import { DGroupStatus } from "src/types/enums/DGroupStatus";
import { MembershipType } from "../types";

export interface RecordItemUI {
	id: number;
	url?: string;
	fullName: string;
	completeName: string;
	fallbackText: string;
	age: number;
	ministryText: string;
	membershipType: DGroupStatus;
	dleaderName?: string;
	spouseName?: string;
	isActive: boolean;
}
