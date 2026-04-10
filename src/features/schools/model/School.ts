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

export interface StudentListItemDTO {
	id: number;
	firstName: string;
	middleName: string | null;
	lastName: string;
	profilePicture: string | null;
}

export interface SchoolListItemDTO {
	id: number;
	name: string;
	acronym: string | null;
	address: string;
	createdAt: Date;
	updatedAt: Date;
	enrolledStudentCount: number;
	alumniStudentCount: number;
}

export interface SchoolDTO {
	id: number;
	name: string;
	acronym: string | null;
	address: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateSchoolDTO {
	name: string;
	acronym: string | null;
	address: string;
}

export type GetSchoolResponse = PaginatedResponse<SchoolListItemDTO>;
export type GetStudentsResponse = PaginatedResponse<StudentListItemDTO>;
