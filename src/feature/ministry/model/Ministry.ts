import { PaginatedResponse } from "../../../types/paginationTypes";

// export interface Speaker {
// 	id: number;
// 	name: string;
// 	accountId: number;
// 	updatedBy: Date;
// 	createdAt: Date;
// 	updatedAt: Date;
// }

// export interface EventSpeaker {
// 	speakerId: number;
// 	eventId: number;
// 	createdAt: Date;
// 	speaker: Speaker;
// }

// export interface Series {
// 	id: number;
// 	name: string;
// 	createdAt: Date;
// 	updatedAt?: Date;
// }

export interface MinistryDTO {
	id: number;
	name: string;
	mission: string;
	vision: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateMinistryDTO {
	name: string;
	mission?: string;
	vision?: string;
	description?: string;
}

export type GetMinistryResponse = PaginatedResponse<MinistryDTO>;
