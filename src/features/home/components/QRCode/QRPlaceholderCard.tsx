import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { mdiQrcode } from "@mdi/js";
import { useTheme } from "@theme/ThemeProvider";
import MDIIcon from "@components/MDIIcon";

type Props = {
	message?: string;
};

export const QRPlaceholderCard: React.FC<Props> = ({
	message = 'Tap "Show QR" to display',
}) => {
	const { theme, isDarkMode } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.background, // gray-50
				},
			]}
		>
			<MDIIcon
				path={mdiQrcode}
				size={64}
				color={isDarkMode ? "#4B5563" : "#D1D5DB"}
			/>

			<Text style={[styles.text, { color: theme.muted }]}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 32,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		marginTop: 8,
		fontSize: 14,
		textAlign: "center",
	},
});
