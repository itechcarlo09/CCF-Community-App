import { StyleSheet } from "react-native";

export const createStyles = (size: number) =>
	StyleSheet.create({
		container: {
			width: size,
			height: size,
			borderRadius: size / 2,
			overflow: "hidden",
			backgroundColor: "#eee",
			alignItems: "center",
			justifyContent: "center",
		},
		image: {
			width: "100%",
			height: "100%",
			borderRadius: size / 2,
		},
		fallback: {
			width: "100%",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
		},
		number: {
			fontSize: 21,
			lineHeight: 21,
			fontWeight: "semibold",
		},
		day: {
			fontSize: 9,
			lineHeight: 9,
			fontWeight: "semibold",
		},
	});
