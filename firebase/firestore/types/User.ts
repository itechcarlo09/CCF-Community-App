export interface User {
	id?: string; // Optional for new entries
	firstName: string;
	middleName: string;
	lastName: string;
	createdAt?: Date;
	updatedAt?: Date; // Use Firebase Timestamp or Date depending on your usage
}
