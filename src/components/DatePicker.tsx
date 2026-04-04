import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateForDisplay } from "src/utils/dateFormatter";
import dayjs from "dayjs";

interface BirthDatePickerProps {
	value: Date | string | null;
	onChange: (date: Date) => void;
	error?: string;
	touched?: boolean;
	label?: string;
	required?: boolean;
}

export const DatePicker: React.FC<BirthDatePickerProps> = ({
	value,
	onChange,
	error,
	touched,
	label = "Date",
	required = false,
}) => {
	const [showPicker, setShowPicker] = useState(false);

	const handleChange = (_event: any, selectedDate?: Date) => {
		setShowPicker(false);
		if (selectedDate) {
			onChange(selectedDate);
		}
	};

	return (
		<View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>{label}</Text>
				{required && <Text style={styles.required}> *</Text>}
			</View>

			<TouchableOpacity
				style={[
					styles.dateTouchable,
					touched && error && { borderColor: "red" },
				]}
				onPress={() => setShowPicker(true)}
			>
				<Text style={{ color: value ? "#111827" : "#9CA3AF" }}>
					{value ? formatDateForDisplay(value) : `Select ${label}`}
				</Text>
			</TouchableOpacity>

			{touched && error && <Text style={styles.errorText}>{error}</Text>}

			{showPicker && (
				<DateTimePicker
					value={value instanceof Date ? dayjs(value).toDate() : new Date()}
					mode="date"
					display="default"
					onChange={handleChange}
					maximumDate={new Date()} // optional: prevent future dates
				/>
			)}
		</View>
	);
};

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
	dateTouchable: {
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		paddingStart: 10,
		height: 48,
		backgroundColor: "#FFFFFF",
	},
	errorText: { color: "red", marginTop: 4, fontSize: 12 },
});
