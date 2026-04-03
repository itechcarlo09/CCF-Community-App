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

export interface SchoolDTO {
	id: number;
	name: string;
	acronym: string;
	address: string;
	createdAt: Date;
	updatedAt: Date;
	activeEducationCount: number;
	completedEducationCount: number;
}

// export interface CreateMinistryDTO {
// 	name: string;
// 	mission?: string;
// 	vision?: string;
// 	description?: string;
// }

export type GetSchoolResponse = PaginatedResponse<SchoolDTO>;
