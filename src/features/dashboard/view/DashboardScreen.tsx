import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDashboardViewModel } from "../viewModel/useDashboardViewModel";
import Loading from "@components/Loading";
import DashboardCard from "./components/DataTile";
import { useTheme } from "@theme/ThemeProvider";

export const DashboardScreen = () => {
	const { theme } = useTheme();
	const { loading, dashboard } = useDashboardViewModel();
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={[styles.header, { color: theme.text }]}>Dashboard</Text>
			{loading ? (
				<Loading />
			) : (
				<View style={styles.cardsContainer}>
					<DashboardCard
						title="Total Accounts"
						value={dashboard?.totalAccounts ?? 0}
						color="#4F8EF7"
					/>
					<DashboardCard
						title="Facilitators"
						value={dashboard?.facilitators ?? 0}
						color="#34C759"
					/>
					<DashboardCard
						title="DLeaders"
						value={dashboard?.dLeaders ?? 0}
						color="#FF9500"
					/>
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#F5F5F5",
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 16,
	},
	cardsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
});
