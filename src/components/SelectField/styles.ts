import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 6,
		borderWidth: 1,
		height: 40,
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: 400,
	},
	disabled: {
		backgroundColor: "#A0A0A0",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		fontSize: 16,
		fontWeight: 500,
		marginBottom: 6,
	},
	error: {
		color: "red",
		marginTop: 8,
		fontSize: 14,
	},
});
