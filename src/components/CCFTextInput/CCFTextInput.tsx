import React, { useEffect, useState } from "react";
import {
	TextInput,
	View,
	TouchableOpacity,
	Text,
	ColorValue,
} from "react-native";
import { CCFTextInputProps } from "./CCFTextInput.types";
import { useTheme } from "@theme/ThemeProvider";
import { styles } from "./CCFTextInput.styles";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import MDIIcon from "@components/MDIIcon";

const CCFTextInput: React.FC<CCFTextInputProps> = ({
	placeholder,
	isPassword = false,
	value,
	onChangeText,
	error,
	touched,
	disabled = false,
}) => {
	const { theme } = useTheme();

	const [isFocused, setIsFocused] = useState(false);
	const [secure, setSecure] = useState(isPassword);

	useEffect(() => {
		setSecure(isPassword);
	}, [isPassword]);

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

	const iconColor = disabled
		? theme.disabled.disabledText
		: showError
		? theme.error.textColor
		: theme.primary;

	return (
		<View style={styles.wrapper}>
			<View>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={theme.muted}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={secure}
					editable={!disabled}
					autoCapitalize="none"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					style={[
						styles.input,
						{
							color: disabled ? theme.disabled.disabledText : theme.text,
							backgroundColor: disabled
								? theme.disabled.disabledBackground
								: theme.background,
							borderColor,
							paddingRight: isPassword ? 44 : 16,
						},
					]}
				/>

				{isPassword && (
					<TouchableOpacity
						style={styles.toggle}
						onPress={() => setSecure((prev) => !prev)}
						activeOpacity={0.7}
						disabled={disabled}
					>
						<MDIIcon
							path={secure ? mdiEyeOutline : mdiEyeOffOutline}
							color={iconColor}
						/>
					</TouchableOpacity>
				)}
			</View>

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

export default CCFTextInput;
