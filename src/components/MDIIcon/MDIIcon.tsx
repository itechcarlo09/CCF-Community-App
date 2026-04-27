import React from "react";
import Svg, { Path } from "react-native-svg";
import { Pressable, View } from "react-native";
import { styles } from "./MDIIcon.styles";
import { MDIIconProps } from "./MDIIcon.types";
import { useTheme } from "@theme/ThemeProvider";

const MDIIcon: React.FC<MDIIconProps> = ({
	path,
	size = 24,
	color = "#000",
	style,
	onPress,
}) => {
	const { theme } = useTheme();

	const Content = (
		<View style={[styles.container, style]}>
			<Svg width={size} height={size} viewBox="0 0 24 24">
				<Path d={path} fill={color} />
			</Svg>
		</View>
	);

	if (onPress) {
		return (
			<Pressable
				onPress={onPress}
				hitSlop={8}
				style={({ pressed }) => [
					styles.button,
					{ backgroundColor: theme.primary },
					pressed && {
						backgroundColor: theme.buttonClicked,
					},
				]}
			>
				{Content}
			</Pressable>
		);
	}

	return Content;
};

export default MDIIcon;
