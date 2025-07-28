import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { TextFieldProps } from "./types";
import { styles } from "./styles";
import { useTheme } from "../../theme/ThemeProvider";

interface Props extends TextFieldProps {
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	error?: string;
	touched?: boolean;
	required?: boolean;
}

const TextField: React.FC<Props> = ({
	label,
	secureTextEntry,
	value,
	onChangeText,
	onBlur,
	error,
	touched,
	required,
	...inputProps
}) => {
	const { theme } = useTheme();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View style={styles.container}>
			{label && (
				<Text style={[styles.label, { color: theme.slate[700] }]}>
					{label}
					{required && <Text style={styles.required}> *</Text>}
				</Text>
			)}
			<View style={[styles.inputContainer, { borderColor: theme.slate[500] }]}>
				<TextInput
					style={[
						styles.input,
						touched && error ? styles.inputError : null,
						{ color: theme.slate[900] },
					]}
					value={value}
					placeholderTextColor={theme.slate[500]}
					onChangeText={onChangeText}
					onBlur={onBlur}
					secureTextEntry={secureTextEntry && !showPassword}
					{...inputProps}
				/>
				{secureTextEntry && (
					<TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
						<Text style={[styles.toggle, { color: theme.blue[500] }]}>
							{showPassword ? "Hide" : "Show"}
						</Text>
					</TouchableOpacity>
				)}
			</View>
			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default React.memo(TextField);
