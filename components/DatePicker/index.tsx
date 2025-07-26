import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import DatePickerLib from "react-native-date-picker";
import { DatePickerProps } from "./types";
import { styles } from "./styles";
import { formatFullDate } from "../../src/utils/dateFormatter";

const DatePicker: React.FC<DatePickerProps> = ({
	field,
	form,
	label,
	maximumDate = new Date(),
}) => {
	const [open, setOpen] = useState(false);
	const hasError = form.touched[field.name] && form.errors[field.name];

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}

			<Pressable
				onPress={() => setOpen(true)}
				style={[styles.input, hasError && styles.inputError]}
			>
				<Text style={styles.inputText}>{formatFullDate(field.value)}</Text>
			</Pressable>

			<DatePickerLib
				modal
				open={open}
				date={field.value || new Date()}
				mode="date"
				maximumDate={maximumDate}
				onConfirm={(date) => {
					setOpen(false);
					form.setFieldValue(field.name, date);
				}}
				onCancel={() => setOpen(false)}
			/>

			{hasError && (
				<Text style={styles.errorText}>
					{form.errors[field.name] as string}
				</Text>
			)}
		</View>
	);
};

export default DatePicker;
