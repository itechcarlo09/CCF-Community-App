import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { TextFieldProps } from "./types";
import { styles } from "./styles";

interface Props extends TextFieldProps {
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	error?: string;
	touched?: boolean;
}

const TextField: React.FC<Props> = ({
	label,
	secureTextEntry = false,
	value,
	onChangeText,
	onBlur,
	error,
	touched,
	...inputProps
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					style={[styles.input, touched && error ? styles.inputError : null]}
					value={value}
					placeholderTextColor={"#999"}
					onChangeText={onChangeText}
					onBlur={onBlur}
					secureTextEntry={secureTextEntry && !showPassword}
					{...inputProps}
				/>
				{secureTextEntry && (
					<TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
						<Text style={styles.toggle}>{showPassword ? "Hide" : "Show"}</Text>
					</TouchableOpacity>
				)}
			</View>
			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default React.memo(TextField);
