export interface School {
	id: number;
	address: string;
	name: string;
}

export interface Education {
	gradeYear: string;
	course: string;
	startYear: string;
	endYear: string;
	school: School;
}

export interface Company {
	id: number;
	name: string;
	address: string;
}

export interface Employment {
	position: string;
	startYear: string;
	endYear?: string;
	company: Company;
}

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
	education: Education[];
	employment: Employment[];
	latestAttendance?: Date;
}
