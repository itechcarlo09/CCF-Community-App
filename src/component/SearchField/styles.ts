import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		maxHeight: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: { marginRight: 8, color: "#888" },
	input: { flex: 1, fontSize: 16, fontWeight: 400 },
	cancel: { marginLeft: 12, color: "blue" },
});
