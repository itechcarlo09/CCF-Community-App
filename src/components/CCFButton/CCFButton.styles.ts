import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		paddingVertical: 14, // ~py-3.5
		borderRadius: 16, // rounded-2xl
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
	disabled: {
		opacity: 0.5,
	},
});
