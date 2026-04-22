import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		width: "100%",
		paddingVertical: 14, // ~py-3.5
		borderRadius: 16, // rounded-2xl
		alignItems: "center",
		justifyContent: "center",

		// shadow (iOS + Android)
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 3 },
		elevation: 3,
	},
	text: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
	disabled: {
		opacity: 0.5,
	},
});
