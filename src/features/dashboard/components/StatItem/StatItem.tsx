import { useTheme } from "@theme/ThemeProvider";
import React from "react";
import { View, Text } from "react-native";
import { styles } from "./StatItem.styles";
import { StatItemProps } from ".";

const StatItem: React.FC<StatItemProps> = ({ label, value, change }) => {
	const { isDarkMode } = useTheme();
	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: isDarkMode ? "rgba(55, 65, 81, 0.5)" : "#F9FAFB",
				},
			]}
		>
			<View>
				<Text
					style={[styles.label, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }]}
				>
					{label}
				</Text>

				<Text
					style={[styles.value, { color: isDarkMode ? "#FFFFFF" : "#323232" }]}
				>
					{value}
				</Text>
			</View>

			<View
				style={[
					styles.badge,
					{
						backgroundColor: isDarkMode ? "rgba(20, 83, 45, 0.3)" : "#DCFCE7",
					},
				]}
			>
				<Text
					style={[
						styles.badgeText,
						{ color: isDarkMode ? "#4ADE80" : "#15803D" },
					]}
				>
					{change}
				</Text>
			</View>
		</View>
	);
};

export default StatItem;
