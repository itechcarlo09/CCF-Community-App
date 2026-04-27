import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	badge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6, // React Native 0.71+ supports gap
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#E5E7EB", // replace with your accent color
	},
	text: {
		fontSize: 12,
		color: "#111827", // replace with accent-foreground
	},
});
