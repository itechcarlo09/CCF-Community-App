import { design } from "@theme/index";
import { StyleSheet, TextStyle } from "react-native";

export const styles = StyleSheet.create({
	wrapper: {
		position: "relative",
	},
	leftIcon: {
		position: "absolute",
		left: 12,
		top: "50%",
		transform: [{ translateY: -10 }],
		zIndex: 1,
	},
	toggle: {
		position: "absolute",
		right: 12,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		...(design.typography.caption as TextStyle),
	},
	input: {
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 2,
		fontSize: 14,
	},
});
