import { design } from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	shadowWrapper: {
		borderRadius: design.spacing.lg,
		padding: design.spacing.lg,
		// 🔥 iOS shadow
		shadowOpacity: 0.12,
		shadowRadius: design.spacing.lg,
		shadowOffset: { width: 0, height: design.spacing.sm },

		// Android
		elevation: 6,
	},
});
