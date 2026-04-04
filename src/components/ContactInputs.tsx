import { StyleSheet, Text, TextInput, View } from "react-native";
import { formatPHNumber } from "src/utils/dateFormatter";

interface ContactInputsProps {
	value: string;
	onChange: (formatted: string) => void;
	label: string;
	error?: string;
	required?: boolean;
}

export const ContactInputs: React.FC<ContactInputsProps> = ({
	value,
	onChange,
	label,
	error,
	required = false,
}) => {
	return (
		<View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>{label}</Text>
				{required && <Text style={styles.required}> *</Text>}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.prefix}>+63</Text>
				<TextInput
					style={styles.input}
					value={value}
					onChangeText={(value) => onChange(formatPHNumber(value))}
					keyboardType="number-pad"
					maxLength={12}
					placeholder="912-345-6789"
					placeholderTextColor="#9CA3AF"
				/>
			</View>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 12,
	},
	prefix: {
		fontSize: 16,
		marginRight: 4,
		color: "#111827",
	},
	input: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 10,
		color: "#111827",
	},
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
	errorText: { color: "red", marginTop: 4, fontSize: 12 },
});
