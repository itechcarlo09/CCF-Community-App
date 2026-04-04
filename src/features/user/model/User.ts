import { PaginatedResponse } from "../../../types/paginationTypes";

export interface SchoolDTO {
	id: number;
	address: string;
	name: string;
}

export interface EducationDTO {
	gradeYear: string;
	course: string | null;
	startDate: string;
	endDate?: string;
	school: SchoolDTO;
}

export interface CompanyDTO {
	id: number;
	name: string;
	address: string;
}

export interface EmploymentDTO {
	position: string;
	startDate: string;
	endDate?: string;
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
	profilePicture?: string;
	facebookLink?: string;
	contactNumber: string;
	dGroupMembers?: DGroupBasicInfoDTO[];
	email: string;
	gender: string;
	userType: string;
	isActive: boolean;
	emergencyContactName?: string;
	emergencyContactNumber?: string;
	education?: EducationDTO[];
	employment?: EmploymentDTO[];
	latestAttendance?: Date;
}

export type GetUserResponse = PaginatedResponse<UserDTO>;
