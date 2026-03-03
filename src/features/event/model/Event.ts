import { User } from "../../user/model/user";

export interface Event {
	id: number;
	name: string;
	date: Date;
	location: string;
	createdAt: Date;
	updatedAt?: Date;
	eventName: string;
	speaker: User | User[];
}
