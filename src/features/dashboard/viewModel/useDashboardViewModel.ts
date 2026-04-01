import { useEffect, useState } from "react";
import { dashboardRepository } from "../data/dashboardRepository";
import { DashboardUI } from "../model/DashboardUI";
import { mapDashboardResponseToDashboard } from "../data/dashboard.mappers";

export const useDashboardViewModel = () => {
	const [dashboard, setDashboard] = useState<DashboardUI>();
	const [loading, setLoading] = useState<boolean>(true);

	const fetchDashboard = async () => {
		try {
			setLoading(true);
			const result = await dashboardRepository.getDashboard();
			const mappedDashboard = mapDashboardResponseToDashboard(result);
			setDashboard(mappedDashboard);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboard();
	}, []);

	return {
		dashboard,
		loading,
	};
};
