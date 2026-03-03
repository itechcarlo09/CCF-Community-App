import { User } from "../../user/model/user";

export interface Series {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt?: Date;
}

export interface Event {
	id: number;
	name: string;
	eventDate: Date;
	location: string;
	createdAt: Date;
	updatedAt?: Date;
	eventName: string;
	speaker: User | User[];
	series: Series;
}
