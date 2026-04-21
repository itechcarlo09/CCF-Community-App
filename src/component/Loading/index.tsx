import React from "react";
import { View, ActivityIndicator } from "react-native";
import { LoadingProps } from "./types";
import { styles } from "./styles";

const Loading: React.FC<LoadingProps> = ({
	size = "large",
	color = "#007AFF",
	fullscreen = true,
}) => {
	return (
		<View
			style={fullscreen ? styles.fullscreenContainer : styles.inlineContainer}
		>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

export default Loading;
