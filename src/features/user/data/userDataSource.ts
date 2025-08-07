import apiClient from "../../../services/apiClient";
import records from "../recordsSample.json";

export const userDataSource = {
	async getUsers(): Promise<any[]> {
		try {
			const res = await apiClient.get<any[]>("/account/all");
			return res.data ? res.data : __DEV__ ? records : [];
		} catch (error: any) {
			console.error("getUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return __DEV__ ? records : [];
		}
	},
};
