import UserType from "src/types/enums/UserType";
import { PaginatedResponse } from "../../../types/paginationTypes";
import { Gender } from "src/types/enums/Gender";

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
	nickname?: string;
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
}

export interface CreateAccountDTO {
	basicInfo: CreateAccountBasicInfoDTO;
}

export interface CreateAccountBasicInfoDTO {
	firstName: string;
	middleName?: string;
	lastName: string;
	nickName?: string;
	profilePicture?: string;
	facebookLink?: string;
	contactNumber?: string;
	email: string;
	gender: Gender;
	birthDate: Date;
	userType: UserType;
	emergencyContactName?: string;
	emergencyContactNumber?: string;
}

export type GetUserResponse = PaginatedResponse<UserDTO>;
