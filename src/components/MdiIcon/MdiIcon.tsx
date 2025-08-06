import React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { styles } from "./MdiIcon.styles";
import { MdiIconProps } from "./MdiIcon.types";

const MdiIcon: React.FC<MdiIconProps> = ({
	path,
	size = 24,
	color = "#000",
	style,
}) => {
	return (
		<View style={[styles.container, style]}>
			<Svg width={size} height={size} viewBox="0 0 24 24">
				<Path d={path} fill={color} />
			</Svg>
		</View>
	);
};

export default MdiIcon;
