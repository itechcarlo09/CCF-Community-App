import { useTheme } from "@theme/ThemeProvider";
import React from "react";
import { View, Text } from "react-native";
import { styles } from "./StatItem.styles";
import { StatItemProps } from ".";

const StatItem: React.FC<StatItemProps> = ({ label, value, change }) => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: theme.stats.backgroundColor,
				},
			]}
		>
			<View>
				<Text style={[styles.label, { color: theme.stats.detailColor }]}>
					{label}
				</Text>

				<Text style={[styles.value, { color: theme.stats.textColor }]}>
					{value}
				</Text>
			</View>

			{change && (
				<View
					style={[
						styles.badge,
						{
							backgroundColor: theme.increaseStats.backgroundColor,
						},
					]}
				>
					<Text
						style={[styles.badgeText, { color: theme.increaseStats.textColor }]}
					>
						{change}
					</Text>
				</View>
			)}
		</View>
	);
};

export default StatItem;
