export interface User {
	id: number;

	// Profile Info
	firstName: string;
	middleName?: string; // optional
	lastName: string;
	// email: string;
	// phoneNumber?: string;
	// profileImage?: string;

	// Birthdate & timestamps
	birthdate?: Date; // converted from Firestore Timestamp
	createdAt: Date;
	updatedAt?: Date; // optional, can be null if not updated

	// Optional custom fields
	// isActive?: boolean;
	// role?: "admin" | "user" | "moderator"; // extendable enum
}

export interface DGroupLeader {
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
	dGroupLeader?: DGroupLeader | null;
	facebookLink: string;
	contactNumber: string;
	dGroupMembers?: number;
	email: string;
	gender: string;
	userType: string;
	emergencyContactName: string;
	emergencyContactNumber: string;
}
