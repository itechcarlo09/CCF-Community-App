import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 6,
		color: "#222",
	},
	input: {
		alignItems: "flex-start",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 6,
		height: 42,
	},
	inputText: {
		fontSize: 16,
		color: "#333",
		marginStart: 10,
	},
	placeholderText: {
		fontSize: 16,
		marginStart: 10,
	},
	error: {
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
	required: {
		color: "red",
	},
});
