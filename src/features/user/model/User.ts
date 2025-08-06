export interface User {
	id: string;

	// Profile Info
	firstName: string;
	middleName?: string; // optional
	lastName: string;
	// email: string;
	// phoneNumber?: string;
	// profileImage?: string;

	// Birthdate & timestamps
	birthdate: Date; // converted from Firestore Timestamp
	createdAt: Date;
	updatedAt?: Date; // optional, can be null if not updated

	// Optional custom fields
	// isActive?: boolean;
	// role?: "admin" | "user" | "moderator"; // extendable enum
}

export interface User {
	accountId: number;
	firstName: string;
	middleName?: string;
	lastName: string;
	facebookLink: string;
	contactNumber: string;
	email: string;
	gender: string;
	birthDate: Date;
	type: string;
	dGroupLeaderId: string;
	createdDate: Date;
	updatedDate: Date;
}
