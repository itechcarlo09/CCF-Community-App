import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Badge.styles";
import { BadgeProps } from "./Badge.types";
import { useTheme } from "../../../../../theme/ThemeProvider";

const Badge: React.FC<BadgeProps> = ({ type, dleader }) => {
	const { theme } = useTheme();

	// Determine text color based on type and dleader
	let textColor;
	if (type === "DLeader") {
		textColor = theme.badge.success.text;
	} else if (type === "Facilitator") {
		textColor = theme.badge.primary.text;
	} else if (dleader) {
		textColor = theme.badge.secondary.text;
	} else {
		textColor = theme.badge.warning.text;
	}

	// Determine background color based on type and dleader
	let backgroundColor;
	if (type === "DLeader") {
		backgroundColor = theme.badge.success.background;
	} else if (type === "Facilitator") {
		backgroundColor = theme.badge.primary.background;
	} else if (dleader) {
		backgroundColor = theme.badge.secondary.background;
	} else {
		backgroundColor = theme.badge.warning.background;
	}

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text
				style={[
					styles.text,
					{
						color: textColor,
					},
				]}
			>
				{type}
			</Text>
		</View>
	);
};

export default Badge;
