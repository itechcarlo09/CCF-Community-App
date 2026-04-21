import React from "react";
import { Text, View } from "react-native";
import { AttendanceViewProps } from "./AttendanceView.types";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { styles } from "./AttendanceView.styles";

const AttendanceView: React.FC<AttendanceViewProps> = ({ title, count }) => {
	const { theme } = useTheme();

	return (
		<View>
			<Text style={[styles.text, { color: theme.gray[500] }]}>{title}</Text>
			<Text style={[styles.number, { color: theme.text }]}>{count}</Text>
		</View>
	);
};

export default AttendanceView;
