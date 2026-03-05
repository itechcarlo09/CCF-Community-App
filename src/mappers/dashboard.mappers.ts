import { Dashboard } from "../features/dashboard/model/Dashboard";
import { DashboardUI } from "../features/dashboard/model/DashboardUI";

export const mapDashboardResponseToDashboard = (
	data: Dashboard,
): DashboardUI => {
	return {
		totalAccounts: data.totalAccounts,
		facilitators: data.facilitators,
		dLeaders: data.dLeaders,
	};
};
