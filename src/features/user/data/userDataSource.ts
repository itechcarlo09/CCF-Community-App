import apiClient from "../../../services/apiClient";
import Gender from "../../../types/enums/Gender";
import { GetUsersParams } from "../model/RequestParams";
import { GetUserResponse, UserDTO } from "../model/user";

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

	async searchUsers(
		params?: GetUsersParams,
	): Promise<GetUserResponse | undefined> {
		try {
			const res = await apiClient.get<GetUserResponse>(
				`/account/search-by-name`,
				{
					params,
				},
			);
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("searchUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return undefined;
		}
	},

	async addUser(data: any): Promise<any | null> {
		try {
			const res = await apiClient.post<any>("/account", {
				basicInfo: {
					...data,
				},
			});
			return res.data ?? null;
		} catch (error: any) {
			console.error("addUser error:", error.message ?? error);
		}
	},

	async addEducation(data: any): Promise<any | null> {
		try {
			const res = await apiClient.post<any>("/education", data);
			return res.data ?? null;
		} catch (error: any) {
			console.error("addEducation error:", error.message ?? error);
		}
	},

	async getUserById(userId: string): Promise<UserDTO | null> {
		try {
			const res = await apiClient.get<UserDTO>(`/account/${userId}`);
			return res.data ? res.data : null;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},

	async editUser(id: string, data: Partial<any>): Promise<any | null> {
		try {
			const res = await apiClient.patch<any>(`/account/${id}`, data);
			return res.data ?? null;
		} catch (error: any) {
			console.error("editUser error:", error.message ?? error);
			return null;
		}
	},
};
