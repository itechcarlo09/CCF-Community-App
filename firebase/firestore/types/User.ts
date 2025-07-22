import { Timestamp } from "@react-native-firebase/firestore";

export type CreateUserInput = {
	firstName: string;
	middleName: string;
	lastName: string;
	birthDate: Date;
	updatedAt?: Date;
};

export type FirebaseUser = CreateUserInput & {
	id: string;
	birthDate: Timestamp;
	createdAt: Date;
};

export type User = CreateUserInput & {
	id: string;
	createdAt: Date;
};
