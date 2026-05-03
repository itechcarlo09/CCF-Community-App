import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	textContainer: {
		flexDirection: "row",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
		borderTopWidth: 0.5,
		borderTopColor: "#eee",
		paddingTop: 8,
		flexWrap: "wrap",
	},

	countItem: {
		flexDirection: "row",
		marginRight: 16,
		marginBottom: 4,
	},

	countLabel: {
		fontSize: 13,
		fontWeight: "600",
		color: "#333",
		marginRight: 4,
	},

	countNumber: {
		fontSize: 13,
		fontWeight: "700",
		color: "#111",
	},
});
