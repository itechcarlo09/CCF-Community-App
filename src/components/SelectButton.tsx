import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SelectButtonProps = {
	label: string;
	value?: string | null;
	placeholder?: string;
	onPress: () => void;
	required?: boolean;
	error?: string;
};

const SelectButton: React.FC<SelectButtonProps> = ({
	label,
	value,
	placeholder = "Select",
	onPress,
	required,
	error,
}) => {
	return (
		<View>
			{/* Label */}
			<View style={styles.labelRow}>
				<Text style={styles.label}>{label}</Text>
				{required && <Text style={styles.required}> *</Text>}
			</View>

			{/* Button */}
			<TouchableOpacity
				style={[styles.button, error && styles.buttonError]}
				onPress={onPress}
				activeOpacity={0.7}
			>
				<Text style={[styles.text, !value && styles.placeholder]}>
					{value || placeholder}
				</Text>
			</TouchableOpacity>

			{/* Error */}
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

export default SelectButton;

const styles = StyleSheet.create({
	labelRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	label: {
		fontSize: 12,
		color: "#6B7280",
	},
	required: {
		color: "#EF4444",
		fontSize: 12,
		fontWeight: "600",
	},
	button: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 12,
		backgroundColor: "#FFFFFF",
	},
	buttonError: {
		borderColor: "#DC2626",
	},
	text: {
		fontSize: 14,
		color: "#111827",
	},
	placeholder: {
		color: "#9CA3AF",
	},
	errorText: {
		color: "#DC2626",
		fontSize: 12,
		marginTop: 4,
	},
});
