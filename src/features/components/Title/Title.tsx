import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Title.styles";
import { TitleProps } from "./Title.types";
import { useTheme } from "../../../theme/ThemeProvider";

const Title: React.FC<TitleProps> = ({ title }) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<Text style={[styles.subTitle, { color: theme.text }]}>{title}</Text>
		</View>
	);
};

export default Title;
