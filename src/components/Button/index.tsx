import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { CustomButtonProps } from "./types";
import { styles } from "./styles";

const Button: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	disabled = false,
	loading = false,
	style,
	textStyle,
}) => {
	return (
		<TouchableOpacity
			style={[styles.button, disabled && styles.disabled, style]}
			onPress={onPress}
			activeOpacity={0.7}
			disabled={disabled || loading}
		>
			{loading ? (
				<ActivityIndicator color="#fff" />
			) : (
				<Text style={[styles.text, textStyle]}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};

export default Button;
