import { Gender } from "src/types/enums/Gender";
import apiClient from "../../../services/apiClient";
import { GetUsersParams } from "../model/RequestParams";
import {
	AddEducationDTO,
	CreateAccountBasicInfoDTO,
	GetUserResponse,
	UserDTO,
} from "../model/user";
import { CreateEducationDTO, CreateEducationListDTO } from "../model/Education";
import {
	ApiResponse,
	EducationGetResponseDTO,
	EducationResponseDTO,
} from "src/types/dto";

export const userDataSource = {
	async getUsers(
		params?: GetUsersParams,
	): Promise<GetUserResponse | undefined> {
		try {
			const res = await apiClient.get<GetUserResponse>("/account/all", {
				params,
			});

			return res.data ?? undefined;
		} catch (error: any) {
			console.error("getUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return undefined;
		}
	},

	async dLeadersUsers(
		exemptedId: number,
		gender: Gender,
	): Promise<GetUserResponse | undefined> {
		try {
			const res = await apiClient.post<GetUserResponse>(
				`/account/dgroup-leaders`,
				{
					exemptedAccountId: exemptedId,
					gender: gender,
				},
			);
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("dLeadersUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return undefined;
		}
	},

	async addUser(data: CreateAccountBasicInfoDTO): Promise<UserDTO | undefined> {
		try {
			console.log("addUser error DataSource:");
			const res = await apiClient.post<UserDTO>("/account", {
				basicInfo: {
					...data,
				},
			});
			return res.data;
		} catch (error: any) {
			console.error("addUser error:", error.message ?? error);
			return undefined;
		}
	},

	async addEducation(data: CreateEducationListDTO): Promise<AddEducationDTO> {
		try {
			const res = await apiClient.post<AddEducationDTO>("/education", data);
			return res.data;
		} catch (error: any) {
			console.error("addEducation error:", error.message ?? error);
			return { accountId: -1 };
		}
	},

	async editEducation(
		id: number,
		data: Partial<CreateEducationDTO>,
	): Promise<ApiResponse<EducationResponseDTO> | undefined> {
		try {
			const res = await apiClient.patch<ApiResponse<EducationResponseDTO>>(
				`/education/${id}`,
				data,
			);
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("editEducation error:", error.message ?? error);
			return undefined;
		}
	},

	async getEducationById(
		educationId: number,
	): Promise<ApiResponse<EducationGetResponseDTO> | undefined> {
		try {
			const res = await apiClient.get<ApiResponse<EducationGetResponseDTO>>(
				`/education/${educationId}`,
			);
			return res.data ? res.data : undefined;
		} catch (error: any) {
			console.error("getEducation error:", error.message ?? error);
			return undefined;
		}
	},

	async getUserById(userId: string): Promise<UserDTO | undefined> {
		try {
			const res = await apiClient.get<UserDTO>(`/account/${userId}`);
			return res.data ? res.data : undefined;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},

	async editUser(id: number, data: Partial<any>): Promise<any | null> {
		try {
			const res = await apiClient.patch<any>(`/account/${id}`, data);
			return res.data ?? null;
		} catch (error: any) {
			console.error("editUser error:", error.message ?? error);
			return null;
		}
	},

	async deleteEducation(
		id: number,
	): Promise<ApiResponse<EducationResponseDTO> | undefined> {
		try {
			const res = await apiClient.delete<ApiResponse<EducationResponseDTO>>(
				`/education/${id}`,
			);
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("editEducation error:", error.message ?? error);
			return undefined;
		}
	},
};
