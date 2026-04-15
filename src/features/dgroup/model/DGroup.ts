import { Gender } from "src/types/enums/Gender";
import { PaginatedResponse } from "../../../types/paginationTypes";
import { LifeStage } from "src/types/enums/LifeStage";

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

export interface LeaderDTO {
	id: number;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: Gender;
}

export interface DGroupDTO {
	id: number;
	name: string;
	members: number;
	leaders: LeaderDTO[];
	lifestage: LifeStage[];
}

export type GetDGroupResponse = PaginatedResponse<DGroupDTO>;
