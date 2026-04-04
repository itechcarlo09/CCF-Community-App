import React from "react";
import Svg, { Path } from "react-native-svg";
import { Pressable, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./MdiIcon.styles";
import { MdiIconProps } from "./MdiIcon.types";

const MdiIcon: React.FC<MdiIconProps> = ({
	path,
	size = 24,
	color = "#000",
	style,
	onPress,
}) => {
	const circleSize = size + 6 * 2;
	const circleStyle: ViewStyle = {
		width: circleSize,
		height: circleSize,
		borderRadius: circleSize / 2,
		backgroundColor: "#E5E7EB",
		alignItems: "center",
		justifyContent: "center",
	};

	const Content = (
		<View style={[styles.container, onPress && circleStyle, style]}>
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

export default MdiIcon;
