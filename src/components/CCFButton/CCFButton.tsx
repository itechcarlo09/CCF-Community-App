import React from "react";
import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { styles } from "./CCFButton.styles";
import { CCFButtonProps } from "./CCFButton.types";
import { useTheme } from "@theme/ThemeProvider";

const CCFButton: React.FC<CCFButtonProps> = ({
	title,
	onPress,
	loading = false,
	disabled = false,
	style,
	variant = "primary",
	icon,
}) => {
	const { theme, isDarkMode } = useTheme();
	const isDisabled = disabled || loading;

	const isOutline = variant === "outline";

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={({ pressed }) => [
				styles.button,
				isOutline
					? {
							backgroundColor: isDarkMode
								? theme.active.backgroundColor
								: theme.outlineButtonClicked,
							borderColor: theme.active.borderColor,
							borderWidth: 2,
					  }
					: {
							// shadow (iOS + Android)
							shadowColor: "#000",
							shadowOpacity: 0.15,
							shadowRadius: 6,
							shadowOffset: { width: 0, height: 3 },
							elevation: 3,
							backgroundColor: theme.primary,
					  },
				pressed &&
					!isDisabled &&
					(isOutline
						? {
								backgroundColor: isDarkMode
									? theme.outlineButtonClicked
									: theme.active.backgroundColor,
						  }
						: { backgroundColor: theme.buttonClicked }),
				isDisabled && styles.disabled,
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator color={isOutline ? theme.primary : theme.white} />
			) : (
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					{icon}
					<Text
						style={[
							styles.text,
							{ color: isOutline ? theme.primary : theme.white },
						]}
					>
						{title}
					</Text>
				</View>
			)}
		</Pressable>
	);
};

export default CCFButton;
