import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { CCFTextInputProps } from "./CCFTextInput.types";
import { useTheme } from "@theme/ThemeProvider";
import { styles } from "./CCFTextInput.styles";

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
				<TouchableOpacity
					style={styles.toggle}
					onPress={() => setSecure(!secure)}
				>
					<Text
						style={{
							color: theme.primary,
						}}
					>
						{secure ? "Show" : "Hide"}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default CCFTextInput;
