import { Dashboard } from "../model/Dashboard";
import { DashboardUI } from "../model/DashboardUI";

export const mapDashboardResponseToDashboard = (
	data: Dashboard,
): DashboardUI => {
	return {
		totalAccounts: data.totalAccounts,
		facilitators: data.facilitators,
		dLeaders: data.dLeaders,
	};
};
