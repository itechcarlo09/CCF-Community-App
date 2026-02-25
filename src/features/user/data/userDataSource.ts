import apiClient from "../../../services/apiClient";
import { User } from "../model/user";
import records from "../recordsSample.json";

export const userDataSource = {
	async getUsers(): Promise<any[]> {
		try {
			console.log(apiClient);
			const res = await apiClient.get<any[]>("/account/all");
			return res.data ? res.data : __DEV__ ? records : [];
		} catch (error: any) {
			console.log(error);
			console.error("getUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return __DEV__ ? records : [];
		}
	},

	async searchUsers(searchText: string): Promise<any[]> {
		try {
			console.log(apiClient);
			const res = await apiClient.get<any[]>(
				`/account/search-by-name?name=${searchText}`,
			);
			return res.data ? res.data : __DEV__ ? records : [];
		} catch (error: any) {
			console.log(error);
			console.error("searchUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return __DEV__ ? records : [];
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

			// DEV mode: simulate adding to local JSON
			if (__DEV__) {
				const newUser = {
					...data,
				};
				records.push(newUser);
				return newUser;
			}

			throw new Error("Database error: " + error.message);
		}
	},

	async getUserById(userId: string): Promise<User | null> {
		try {
			const res = await apiClient.get<User>(`/account/${userId}`);
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

			// DEV mode: simulate update in local JSON data
			if (__DEV__) {
				const index = records.findIndex((user) => user.id === Number(id));
				if (index !== -1) {
					records[index] = { ...records[index], ...data };
					return records[index];
				}
			}

			return null;
		}
	},
};
