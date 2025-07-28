import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 6,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
	inputError: {
		borderColor: "red",
	},
	toggle: {
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
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	required: {
		color: "red",
	},
});
