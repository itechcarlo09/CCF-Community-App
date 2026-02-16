import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	label: {
		fontSize: 16,
		fontWeight: 500,
		marginBottom: 6,
	},
	text: {
		color: "#000",
		fontSize: 16,
		fontWeight: "600",
	},
	disabled: {
		backgroundColor: "#A0A0A0",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconLeft: {
		marginRight: 6,
	},
	iconRight: {
		marginLeft: 6,
	},
	dualFields: {
		columnGap: 12,
		flexDirection: "row",
	},
});
