import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DataTile from "./components/DataTile";
import { useDashboardViewModel } from "../viewModel/useDashboardViewModel";
import Loading from "../../../components/Loading";

const DashboardScreen = () => {
	const { loading, dashboard } = useDashboardViewModel();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to the Dashboard!</Text>
			{loading ? (
				<Loading />
			) : (
				<View style={styles.rg}>
					<DataTile label={"Members"} value={dashboard?.totalAccounts ?? 0} />
					<DataTile
						label={"Facilitators"}
						value={dashboard?.facilitators ?? 0}
					/>
					<DataTile label={"DLeaders"} value={dashboard?.dLeaders ?? 0} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, marginHorizontal: 16, marginVertical: 12, rowGap: 12 },
	text: { fontSize: 18, fontWeight: "bold", color: "#333" },
	rg: { rowGap: 12 },
});

export default DashboardScreen;
