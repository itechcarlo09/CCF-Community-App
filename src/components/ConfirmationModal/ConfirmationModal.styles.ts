import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 20,
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 10,
	},
	message: {
		fontSize: 16,
		marginBottom: 20,
		color: "#333",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 10,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	cancelButton: {
		backgroundColor: "#eee",
	},
	confirmButton: {
		backgroundColor: "#e74c3c",
	},
	cancelText: {
		color: "#333",
		fontWeight: "500",
	},
	confirmText: {
		color: "#fff",
		fontWeight: "500",
	},
});
