export interface DGroupBasicInfo {
	id: number;
	firstName: string;
	middleName?: string;
	lastName: string;
}

export interface User {
	id: number;
	firstName: string;
	middleName?: string;
	lastName: string;
	birthDate: Date;
	dGroupLeaderId?: number | null;
	dGroupLeader?: DGroupBasicInfo;
	facebookLink: string;
	contactNumber: string;
	dGroupMembers?: DGroupBasicInfo[];
	email: string;
	gender: string;
	userType: string;
	emergencyContactName: string;
	emergencyContactNumber: string;
}
