import { MembershipType } from "../types";

export interface RecordItemUI {
	id: number;
	fullName: string;
	completeName: string;
	fallbackText: string;
	age: number;
	ministryText: string;
	membershipType: MembershipType;
	dleaderName?: string;
	isActive: boolean;
}
