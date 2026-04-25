import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 12,
		borderRadius: 12,
	},
	label: {
		fontSize: 14,
	},
	value: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 4,
	},
	badge: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 999,
	},
	badgeText: {
		fontSize: 14,
	},
});
