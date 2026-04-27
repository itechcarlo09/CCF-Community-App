import apiClient from "../../../services/apiClient";
import { DashboardDTO } from "../model/DashboardDTO";

export const dashboardDataSource = {
	async getDashboard(): Promise<DashboardDTO> {
		try {
			const res = await apiClient.get<DashboardDTO>("/dashboard/metrics");
			return res.data ? res.data : ({} as unknown as DashboardDTO);
		} catch (error: any) {
			console.error("getDashboard error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return {} as unknown as DashboardDTO;
		}
	},
};
