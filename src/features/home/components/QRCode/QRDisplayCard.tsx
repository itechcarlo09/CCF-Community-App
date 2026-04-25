import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { mdiQrcode } from "@mdi/js";
import { useTheme } from "@theme/ThemeProvider";
import MDIIcon from "@components/MDIIcon";

type Props = {
	hint?: string;
};

export const QRDisplayCard: React.FC<Props> = ({
	hint = "Scan this at events for attendance",
}) => {
	const { theme, isDarkMode } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: isDarkMode
						? theme.active.backgroundColor
						: theme.outlineButtonClicked,
					borderColor: theme.active.borderColor,
				},
			]}
		>
			<View style={styles.qrWrapper}>
				<View
					style={[
						styles.qrBox,
						{
							backgroundColor: theme.active.textColor, // fallback if no gradient lib
						},
					]}
				>
					<MDIIcon path={mdiQrcode} size={128} color={theme.white} />
				</View>
			</View>

			<Text style={[styles.hint, { color: theme.muted }]}>{hint}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 24,
		borderRadius: 16,
		borderWidth: 2,
	},
	qrWrapper: {
		aspectRatio: 1,
		borderRadius: 12,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	qrBox: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
	},
	hint: {
		textAlign: "center",
		fontSize: 12,
		marginTop: 12,
	},
});
