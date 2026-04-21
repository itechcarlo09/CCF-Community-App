import React from "react";
import { Text, View } from "react-native";
import { EventDetailViewProps } from "./EventDetailView.types";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { styles } from "./EventDetailView.styles";
import MdiIcon from "../../../../../component/MdiIcon";

const EventDetailView: React.FC<EventDetailViewProps> = ({
	iconPath,
	text,
}) => {
	const { theme } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.gray[200] }]}>
			<MdiIcon path={iconPath} size={12} color="#323232" />
			<Text style={[styles.text, { color: theme.text }]}>{text}</Text>
		</View>
	);
};

export default EventDetailView;
