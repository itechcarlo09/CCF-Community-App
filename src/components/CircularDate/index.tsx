import React from "react";
import { View, Image, Text } from "react-native";
import { CircularDateProps } from "./types";
import { createStyles } from "./styles";
import { useTheme } from "../../theme/ThemeProvider";
import dayjs from "dayjs";

const CircularDate: React.FC<CircularDateProps> = ({ date, size = 100 }) => {
	const styles = createStyles(size);
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<View style={[styles.fallback, { backgroundColor: theme.gray[500] }]}>
				<Text style={[styles.day, { color: theme.white }]}>
					{dayjs(date).format("MMM")}
				</Text>
				<Text style={[styles.number, { color: theme.white }]}>
					{dayjs(date).date()}
				</Text>
				<Text style={[styles.day, { color: theme.white }]}>
					{dayjs(date).format("ddd")}
				</Text>
			</View>
		</View>
	);
};

export default CircularDate;
