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
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
	},
	inputError: {
		borderColor: "red",
	},
	error: {
		color: "red",
		marginTop: 4,
		fontSize: 14,
	},
});
