import React from "react";
import { Pressable, View } from "react-native";
import { ShadowCardProps } from "./ShadowCard.types";
import { styles } from "./ShadowCard.styles";
import { useTheme } from "@theme/ThemeProvider";

const ShadowCard: React.FC<ShadowCardProps> = ({
	children,
	style,
	onPress,
	containerStyle,
}) => {
	const { theme } = useTheme();
	return (
		<Pressable
			style={[
				{ backgroundColor: theme.card, shadowColor: theme.black },
				styles.shadowWrapper,
				containerStyle,
			]}
			onPress={onPress}
		>
			<View style={style}>{children}</View>
		</Pressable>
	);
};

export default ShadowCard;
