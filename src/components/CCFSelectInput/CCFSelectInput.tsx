import React, { useState } from "react";
import { View, Text, TouchableOpacity, ColorValue } from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import MDIIcon from "@components/MDIIcon";
import { mdiChevronRight, mdiMagnify } from "@mdi/js";
import { styles } from "./CCFSelectInput.styles";

interface CCFSelectInputProps {
	placeholder?: string;
	value?: string;
	onPress?: () => void;
	error?: string;
	touched?: boolean;
	containerStyle?: any;
	disabled?: boolean;
	isSearch?: boolean;
	label?: string;
	required?: boolean;
}

const CCFSelectInput: React.FC<CCFSelectInputProps> = ({
	placeholder,
	value,
	onPress,
	error,
	touched,
	containerStyle,
	disabled = false,
	isSearch = false,
	label,
	required,
}) => {
	const { theme } = useTheme();
	const [isFocused, setIsFocused] = useState(false);

	const showError = !!error && (touched ?? true);

	const borderColor = (
		showError
			? theme.error.borderColor
			: isFocused
			? theme.primary
			: disabled
			? theme.disabled.disabledBorder
			: theme.border
	) as ColorValue;

	const textColor = disabled
		? theme.disabled.disabledText
		: value
		? theme.text
		: theme.muted;

	const iconColor = disabled
		? theme.disabled.disabledText
		: showError
		? theme.error.textColor
		: theme.primary;

	const leftIconColor = disabled ? theme.disabled.disabledText : theme.muted;

	return (
		<View style={[styles.wrapper, containerStyle]}>
			{label && (
				<Text style={{ marginBottom: 6, color: theme.text, fontSize: 14 }}>
					{label}
					{required && <Text style={{ color: theme.error.textColor }}> *</Text>}
				</Text>
			)}
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onPress}
				disabled={disabled}
				onPressIn={() => setIsFocused(true)}
				onPressOut={() => setIsFocused(false)}
			>
				<View>
					{isSearch && (
						<View style={styles.leftIcon}>
							<MDIIcon path={mdiMagnify} color={leftIconColor} />
						</View>
					)}

					<View
						style={[
							styles.input,
							{
								justifyContent: "center",
								borderColor,
								backgroundColor: disabled
									? theme.disabled.disabledBackground
									: theme.background,
								paddingLeft: isSearch ? 44 : 16,
								paddingRight: 44,
							},
						]}
					>
						<Text style={{ color: textColor }}>{value || placeholder}</Text>
					</View>

					<View style={styles.toggle}>
						<MDIIcon path={mdiChevronRight} color={iconColor} />
					</View>
				</View>
			</TouchableOpacity>

			{showError && (
				<Text
					style={{
						color: theme.error.textColor,
						fontSize: 12,
						marginTop: 6,
						marginLeft: 4,
					}}
				>
					{error}
				</Text>
			)}
		</View>
	);
};

export default CCFSelectInput;
