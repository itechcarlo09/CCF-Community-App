import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		rowGap: 8,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerText: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 600,
	},
	labelText: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 500,
	},
	valueText: {
		fontSize: 18,
		lineHeight: 28,
		fontWeight: 600,
	},
	detailsContainer: {
		rowGap: 12,
	},
});
