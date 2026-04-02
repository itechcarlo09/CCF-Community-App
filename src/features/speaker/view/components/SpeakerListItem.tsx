import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { SpeakerItemUI } from "../../model/SpeakerItemUI";
import CircularImage from "@components/CircularImage";

type Props = {
	item: SpeakerItemUI;
	onPress?: () => void;
	width?: number; // optional, used for grid
};

const { width: screenWidth } = Dimensions.get("window");

const SpeakerCard: React.FC<Props> = ({ item, onPress, width }) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[
				styles.card,
				{ backgroundColor: theme.card, width: width || screenWidth / 2 - 18 },
			]}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<CircularImage
				uri={item.image}
				size={64}
				fallbackText={item.fallbackName}
			/>

			<Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
				{item.name}
			</Text>
		</TouchableOpacity>
	);
};

export default SpeakerCard;

const styles = StyleSheet.create({
	card: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		paddingHorizontal: 10,
		borderRadius: 18,

		// modern soft shadow
		elevation: 3,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },

		// spacing for grid layout
		margin: 6,
	},

	name: {
		fontSize: 14,
		fontWeight: "600",
		textAlign: "center",
		marginTop: 6,
	},
});
