import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { CCFTextInputProps } from "./CCFTextInput.types";
import { useTheme } from "@theme/ThemeProvider";
import { styles } from "./CCFTextInput.styles";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import MDIIcon from "@components/MDIIcon";

const CCFTextInput: React.FC<CCFTextInputProps> = ({
	placeholder,
	isPassword,
	value,
	onChangeText,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [secure, setSecure] = useState(isPassword);
	const { theme } = useTheme();

	return (
		<View style={styles.wrapper}>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={theme.muted}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secure}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				style={[
					styles.input,
					{
						color: theme.text,
						borderColor: isFocused ? theme.primary : theme.border,
					},
				]}
			/>

			{isPassword && (
				<View style={styles.toggle}>
					<MDIIcon
						onPress={() => setSecure(!secure)}
						path={secure ? mdiEyeOutline : mdiEyeOffOutline}
						color={theme.primary}
					/>
				</View>
			)}
		</View>
	);
};

export default CCFTextInput;
