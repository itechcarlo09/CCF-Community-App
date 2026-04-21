import React from "react";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./MDIIcon.styles";
import { MDIIconProps } from "./MDIIcon.types";

const MDIIcon: React.FC<MDIIconProps> = ({
	path,
	size = 24,
	color = "#000",
	style,
	onPress,
}) => {
	const Content = (
		<View style={[styles.container, style]}>
			<Svg width={size} height={size} viewBox="0 0 24 24">
				<Path d={path} fill={color} />
			</Svg>
		</View>
	);

	return onPress ? (
		<TouchableOpacity onPress={onPress} hitSlop={8}>
			{Content}
		</TouchableOpacity>
	) : (
		Content
	);
};

export default MDIIcon;
