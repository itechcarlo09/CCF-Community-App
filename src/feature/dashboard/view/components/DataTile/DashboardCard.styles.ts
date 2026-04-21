import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		width: "48%",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	cardTitle: {
		fontSize: 16,
		color: "#fff",
		marginBottom: 8,
	},
	cardValue: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
	},
});
