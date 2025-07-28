import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 6,
		color: "#222",
	},
	input: {
		padding: 12,
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#ccc",
		backgroundColor: "#f9f9f9",
	},
	inputText: {
		fontSize: 16,
		color: "#333",
	},
	placeholderText: {
		fontSize: 16,
		color: "#999",
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
