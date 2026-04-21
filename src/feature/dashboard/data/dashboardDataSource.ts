import apiClient from "../../../services/apiClient";
import { Dashboard } from "../model/Dashboard";

export const dashboardDataSource = {
	async getDashboard(): Promise<Dashboard> {
		try {
			const res = await apiClient.get<Dashboard>("/dashboard/metrics");
			return res.data ? res.data : ({} as unknown as Dashboard);
		} catch (error: any) {
			console.error("getDashboard error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return {} as unknown as Dashboard;
		}
	},
};
