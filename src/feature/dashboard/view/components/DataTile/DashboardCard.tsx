import MdiIcon from "@components/MdiIcon";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataCardProps } from "./DashboardCard.types";

const DashboardCard: React.FC<DataCardProps> = ({
	title,
	value,
	color,
	icon,
}) => {
	return (
		<View style={styles.card}>
			<View style={styles.row}>
				<MdiIcon
					style={[styles.iconContainer, { backgroundColor: color + "20" }]}
					path={icon}
					size={24}
					color="#323232"
				/>
				<Text style={styles.title}>{title}</Text>
			</View>

			<Text style={[styles.value, { color }]}>{value}</Text>
		</View>
	);
};

export default DashboardCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 16,
		marginBottom: 12,
		elevation: 2,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},

	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},

	title: {
		fontSize: 14,
		color: "#6B7280",
	},

	value: {
		fontSize: 26,
		fontWeight: "700",
	},
});
