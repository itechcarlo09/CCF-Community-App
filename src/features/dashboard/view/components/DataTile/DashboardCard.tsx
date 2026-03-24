import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { styles } from "./DashboardCard.styles";
import { DataCardProps } from "./DashboardCard.types";

const DashboardCard: React.FC<DataCardProps> = ({ title, value, color }) => (
	<View style={[styles.card, { backgroundColor: color }]}>
		<Text style={styles.cardTitle}>{title}</Text>
		<Text style={styles.cardValue}>{value}</Text>
	</View>
);

export default DashboardCard;
