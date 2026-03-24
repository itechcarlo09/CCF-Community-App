import { PaginatedResponse } from "../../../types/paginationTypes";

export interface Speaker {
	id: number;
	name: string;
	accountId: number;
	updatedBy: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface EventSpeaker {
	speakerId: number;
	eventId: number;
	createdAt: Date;
	speaker: Speaker;
}

export interface Series {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt?: Date;
}

export interface EventDTO {
	id: number;
	eventDate: Date;
	location: string;
	createdAt: Date;
	updatedAt?: Date;
	eventName: string;
	eventSpeakers: EventSpeaker[];
	series: Series;
}

export interface CreateEventDTO {
	eventName: string;
	eventDate: Date;
	location: string;
	seriesId: number;
	ministryId: number;
}

export type GetEventResponse = PaginatedResponse<EventDTO>;
