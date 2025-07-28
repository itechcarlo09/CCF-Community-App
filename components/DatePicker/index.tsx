import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { styles } from "./styles";
import { DatePickerFieldProps } from "./types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatFullDate } from "../../src/utils/dateFormatter";

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
	name,
	label,
	value,
	touched,
	error,
	required,
	onChange,
}) => {
	const [showPicker, setShowPicker] = useState(false);

	const show = () => setShowPicker(true);
	const handleChange = (_: any, selectedDate?: Date) => {
		setShowPicker(Platform.OS === "ios");
		if (selectedDate) {
			onChange(name, selectedDate);
		}
	};

	return (
		<View style={styles.container}>
			{label && (
				<Text style={styles.label}>
					{label}
					{required && <Text style={styles.required}> *</Text>}
				</Text>
			)}
			<TouchableOpacity onPress={show} style={styles.input}>
				{value ? (
					<Text style={styles.inputText}>
						{formatFullDate(new Date(value))}
					</Text>
				) : (
					<Text style={styles.placeholderText}>Select Birthdate</Text>
				)}
			</TouchableOpacity>

			{showPicker && (
				<DateTimePicker
					value={value ? new Date(value) : new Date()}
					mode="date"
					display="default"
					onChange={handleChange}
				/>
			)}

			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};
