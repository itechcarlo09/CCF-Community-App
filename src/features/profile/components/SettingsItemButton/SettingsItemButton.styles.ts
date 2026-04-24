import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		padding: 12,
		paddingHorizontal: 8,
		borderRadius: 12,
		backgroundColor: "transparent",
	},
	iconLeft: {
		width: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	iconRight: {
		width: 24,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	label: {
		flex: 1,
		textAlign: "left",
		fontSize: 16,
	},
});
