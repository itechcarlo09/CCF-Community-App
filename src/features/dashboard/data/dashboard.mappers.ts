import { DashboardDTO } from "../model/DashboardDTO";
import { DashboardUI } from "../model/DashboardUI";

export const mapDashboardResponseToDashboard = (
	data: DashboardDTO,
): DashboardUI => {
	return {
		totalAccounts: data.totalAccounts,
		facilitators: data.facilitators,
		dLeaders: data.dLeaders,
	};
};
