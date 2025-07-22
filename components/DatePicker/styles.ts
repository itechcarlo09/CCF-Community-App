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
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: "#f9f9f9",
	},
	inputError: {
		borderColor: "#ff4d4f",
	},
	inputText: {
		fontSize: 16,
		color: "#000",
	},
	errorText: {
		fontSize: 12,
		color: "#ff4d4f",
		marginTop: 4,
	},
});
