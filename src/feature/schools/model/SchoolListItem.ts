export interface SchoolItemUI {
	id: number;
	name: string;
	acronym: string;
	logo?: string;
	location: string;
	currentCount: number;
	alumniCount: number;
}

export interface StudentItemUI {
	id: number;
	fullName: string;
}
