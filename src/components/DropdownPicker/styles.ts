import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 6,
	},
	input: {
		padding: 12,
		borderWidth: 1,
		borderRadius: 6,
	},
	inputText: {
		fontSize: 16,
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
	dropdown: {
		minHeight: 42,
		borderRadius: 6,
		borderWidth: 1,
	},
});
