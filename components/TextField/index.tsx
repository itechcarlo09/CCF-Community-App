import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useField } from "formik";
import { TextFieldProps } from "./types";
import { styles } from "./styles";

const TextField: React.FC<TextFieldProps> = ({
	name,
	label,
	secureTextEntry = false,
	...inputProps
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [field, meta, helpers] = useField(name);

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					style={[
						styles.input,
						meta.touched && meta.error ? styles.inputError : null,
					]}
					value={field.value}
					placeholderTextColor={"#999"}
					onChangeText={helpers.setValue}
					onBlur={() => helpers.setTouched(true)}
					secureTextEntry={secureTextEntry && !showPassword}
					{...inputProps}
				/>
				{secureTextEntry && (
					<TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
						<Text style={styles.toggle}>{showPassword ? "Hide" : "Show"}</Text>
					</TouchableOpacity>
				)}
			</View>
			{meta.touched && meta.error && (
				<Text style={styles.error}>{meta.error}</Text>
			)}
		</View>
	);
};

export default React.memo(TextField);
