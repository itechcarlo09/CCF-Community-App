import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	Modal,
	Button,
} from "react-native";
import { styles } from "./styles";
import { DatePickerFieldProps } from "./types";
import { addYearsAsDate, formatFullDate } from "../../utils/dateFormatter";
import { useTheme } from "../../theme/ThemeProvider";
import dayjs from "dayjs";
import DatePicker from "react-native-date-picker";

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
	name,
	label,
	value,
	touched,
	error,
	required,
	onChange,
}) => {
	const { theme } = useTheme();
	const [showPicker, setShowPicker] = useState(false);

	const show = () => setShowPicker(true);
	const handleChange = (selectedDate?: Date) => {
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
					{required && <Text style={{ color: theme.blue[500] }}> *</Text>}
				</Text>
			)}
			<TouchableOpacity
				onPress={show}
				style={[
					styles.input,
					{
						borderColor:
							touched && error ? theme.icon.danger.tertiary : theme.slate[500],
					},
				]}
			>
				{value ? (
					<Text style={styles.inputText}>
						{formatFullDate(new Date(value))}
					</Text>
				) : (
					<Text style={[styles.placeholderText, { color: theme.slate[400] }]}>
						Select Birthdate
					</Text>
				)}
			</TouchableOpacity>

			<DatePicker
				modal
				mode="date"
				open={showPicker}
				maximumDate={new Date()}
				date={value ? new Date(value) : new Date()}
				onConfirm={(date) => {
					setShowPicker(false);
					handleChange(date);
				}}
				onCancel={() => {
					setShowPicker(false);
				}}
			/>

			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};
