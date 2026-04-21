import React from "react";
import { View, Image, Text } from "react-native";
import { CircularImageProps } from "./types";
import { createStyles } from "./styles";

const CircularImage: React.FC<CircularImageProps> = ({
	uri,
	size = 100,
	fallbackText,
}) => {
	const styles = createStyles(size);
	const hasImage = uri && uri.trim() !== "";

	return (
		<View style={styles.container}>
			{hasImage ? (
				<Image source={{ uri }} style={styles.image} resizeMode="cover" />
			) : (
				<View style={styles.fallback}>
					<Text style={styles.fallbackText}>{fallbackText ?? "?"}</Text>
				</View>
			)}
		</View>
	);
};

export default CircularImage;
