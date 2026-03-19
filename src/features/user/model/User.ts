import { PaginatedResponse } from "../../../types/paginationTypes";

export interface SchoolDTO {
	id: number;
	address: string;
	name: string;
}

export interface EducationDTO {
	gradeYear: string;
	course: string;
	startYear: string;
	endYear: string;
	school: SchoolDTO;
}

export interface CompanyDTO {
	id: number;
	name: string;
	address: string;
}

export interface EmploymentDTO {
	position: string;
	startYear: string;
	endYear?: string;
	company: CompanyDTO;
}

export interface DGroupBasicInfoDTO {
	id: number;
	firstName: string;
	middleName?: string;
	lastName: string;
}

export interface UserDTO {
	id: number;
	firstName: string;
	middleName?: string;
	lastName: string;
	birthDate: Date;
	dGroupLeaderId?: number | null;
	dGroupLeader?: DGroupBasicInfoDTO;
	facebookLink?: string;
	contactNumber: string;
	dGroupMembers?: DGroupBasicInfoDTO[];
	email: string;
	gender: string;
	userType: string;
	emergencyContactName?: string;
	emergencyContactNumber?: string;
	education?: EducationDTO[];
	employment?: EmploymentDTO[];
	latestAttendance?: Date;
}

export type GetUserResponse = PaginatedResponse<UserDTO>;
