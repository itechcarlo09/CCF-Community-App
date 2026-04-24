import React from "react";
import { View } from "react-native";
import { ShadowCardProps } from "./ShadowCard.types";
import { styles } from "./ShadowCard.styles";
import { useTheme } from "@theme/ThemeProvider";

const ShadowCard: React.FC<ShadowCardProps> = ({
	children,
	style,
	containerStyle,
}) => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				{ backgroundColor: theme.card, shadowColor: theme.black },
				styles.shadowWrapper,
				containerStyle,
			]}
		>
			<View style={style}>{children}</View>
		</View>
	);
};

export default ShadowCard;
