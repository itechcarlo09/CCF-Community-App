import React from "react";
import { View, TextInput, Text } from "react-native";
import { useField } from "formik";
import { TextFieldProps } from "./types";
import { styles } from "./styles";

const TextField: React.FC<TextFieldProps> = ({
	name,
	label,
	...inputProps
}) => {
	const [field, meta, helpers] = useField(name);

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}

			<TextInput
				style={[
					styles.input,
					meta.touched && meta.error ? styles.inputError : null,
				]}
				value={field.value}
				onChangeText={helpers.setValue}
				onBlur={() => helpers.setTouched(true)}
				{...inputProps}
			/>

			{meta.touched && meta.error && (
				<Text style={styles.error}>{meta.error}</Text>
			)}
		</View>
	);
};

export default React.memo(TextField);
