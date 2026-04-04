import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
	label: string;
	value: string;
	error?: string;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	label,
	value,
	onBlur,
	error,
	placeholder,
	required,
	onChangeText,
	...rest
}) => {
	return (
		<View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>{label}</Text>
				{required && <Text style={styles.required}> *</Text>}
			</View>

			<TextInput
				style={[styles.input, error && styles.inputError]}
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
				placeholder={placeholder}
				placeholderTextColor="#9CA3AF"
				{...rest}
			/>

			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	label: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
	labelRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	required: {
		color: "#EF4444",
		fontSize: 14,
		fontWeight: "600",
	},
	inputError: { borderColor: "#DC2626" },
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		padding: 10,
		color: "#111827",
		backgroundColor: "#FFFFFF",
	},
	errorText: { color: "#DC2626", fontSize: 12, marginTop: 4 },
});
