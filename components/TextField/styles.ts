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
		flex: 1,
		fontSize: 16,
		color: "#333",
	},
	inputError: {
		borderColor: "red",
	},
	toggle: {
		color: "#007BFF",
		paddingLeft: 12,
		marginLeft: 8,
	},
	error: {
		color: "red",
		marginTop: 4,
		fontSize: 14,
	},
	inputContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	required: {
		color: "red",
	},
});
