import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SeriesButtonProps } from "./SeriesButton.types";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { styles } from "./SeriesButton.styles";
import { mdiArrowRight } from "@mdi/js";
import MdiIcon from "../../../../../components/MdiIcon";

const SeriesButton: React.FC<SeriesButtonProps> = ({
	name,
	textStyle,
	style,
}) => {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			style={[styles.container, { backgroundColor: theme.blue[500] }, style]}
		>
			<Text style={[styles.text, { color: theme.white }, textStyle]}>
				{name}
			</Text>
			<MdiIcon path={mdiArrowRight} size={24} color={theme.background} />
		</TouchableOpacity>
	);
};

export default SeriesButton;
