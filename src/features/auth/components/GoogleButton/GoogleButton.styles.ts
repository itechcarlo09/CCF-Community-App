import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		width: "100%",
		paddingVertical: 14, // py-3.5 ≈ 14px
		backgroundColor: "#FFFFFF",
		borderWidth: 2,
		borderColor: "#58B9DA",
		borderRadius: 16, // rounded-2xl
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 12, // RN 0.71+ supports gap
	},
	text: {
		color: "#323232",
		fontSize: 16,
		fontWeight: "500",
	},
});
