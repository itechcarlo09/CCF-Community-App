import React from "react";
import Svg, { Path } from "react-native-svg";
import { Text, View } from "react-native";
import { styles } from "./Badge.styles";
import { BadgeProps } from "./Badge.types";
import { MembershipType } from "../../../types";
import { useTheme } from "../../../../../theme/ThemeProvider";

const Badge: React.FC<BadgeProps> = ({
	type,
	path,
	size = 24,
	color = "#000",
	style,
}) => {
	const { theme } = useTheme();
	return (
		<Text
			style={[
				styles.text,
				{
					color:
						type == "DLeader"
							? theme.badge.success.text
							: type == "Timothy"
							? theme.badge.primary.text
							: theme.badge.secondary.text,
					backgroundColor:
						type == "DLeader"
							? theme.badge.success.background
							: type == "Timothy"
							? theme.badge.primary.background
							: theme.badge.secondary.background,
				},
			]}
		>
			{type}
		</Text>
	);
};

export default Badge;
