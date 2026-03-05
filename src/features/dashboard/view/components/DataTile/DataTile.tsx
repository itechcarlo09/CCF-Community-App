import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { DataTileProps } from "./DataTile.types";

const DataTile: React.FC<DataTileProps> = ({ label, value }) => {
	const { theme } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.background, borderColor: theme.border },
			]}
		>
			<Text
				style={[
					styles.text,
					{
						color: theme.text,
					},
				]}
			>
				{label}
			</Text>
			<Text
				style={[
					styles.text,
					{
						color: theme.text,
					},
				]}
			>
				{value}
			</Text>
		</View>
	);
};

export default DataTile;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 8,
		height: 50,
		paddingHorizontal: 12,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 24,
		lineHeight: 36,
		fontWeight: 600,
		textAlignVertical: "center",
	},
});
