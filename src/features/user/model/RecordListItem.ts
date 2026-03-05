import { MembershipType } from "../types";

export interface RecordItemUI {
	id: number;
	fullName: string;
	fallbackText: string; // Used for CircularImage fallback
	age: number;
	ministryText: string;
	membershipType: MembershipType;
	dleaderName?: string;
	isActive: boolean;
}
