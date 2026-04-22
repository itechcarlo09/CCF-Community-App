import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { styles } from "./CCFButton.styles";
import { CCFButtonProps } from "./CCFButton.types";
import { useTheme } from "@theme/ThemeProvider";

const CCFButton: React.FC<CCFButtonProps> = ({
	title,
	onPress,
	loading = false,
	disabled = false,
	style,
}) => {
	const { theme } = useTheme();
	const isDisabled = disabled || loading;

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: theme.button },
				pressed && !isDisabled && { backgroundColor: theme.buttonClicked },
				isDisabled && styles.disabled,
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator color={theme.white} />
			) : (
				<Text style={styles.text}>{title}</Text>
			)}
		</Pressable>
	);
};

export default CCFButton;
