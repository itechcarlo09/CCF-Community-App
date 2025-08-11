import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { CustomButtonProps } from "./types";
import { styles } from "./styles";

const Button: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	disabled = false,
	loading = false,
	style,
	textStyle,
	icon,
	iconPosition = "left",
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
				<View style={styles.content}>
					{icon && iconPosition === "left" && (
						<View style={styles.iconLeft}>{icon}</View>
					)}
					<Text style={[styles.text, textStyle]}>{title}</Text>
					{icon && iconPosition === "right" && (
						<View style={styles.iconRight}>{icon}</View>
					)}
				</View>
			)}
		</TouchableOpacity>
	);
};

export default Button;
