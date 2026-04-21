import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
	text: { color: "#111827", fontWeight: "500" },
	disabled: {
		backgroundColor: "#A0A0A0",
	},
	errorButton: {
		borderWidth: 1,
		borderColor: "#FF0000",
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
	error: { color: "red", marginTop: 4, fontSize: 12 },
	label: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
	labelRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	required: {
		color: "#EF4444",
		fontSize: 14,
		fontWeight: "600",
	},
});
