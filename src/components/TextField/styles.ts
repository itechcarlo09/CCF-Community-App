import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: 500,
		marginBottom: 6,
	},
	input: {
		flex: 1,
		fontSize: 16,
		fontWeight: 400,
	},
	toggle: {
		paddingLeft: 12,
		marginLeft: 8,
	},
	error: {
		color: "red",
		marginTop: 8,
		fontSize: 14,
	},
	inputContainer: {
		borderRadius: 6,
		borderWidth: 1,
		height: 42,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},
});
