import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { DropdownPickerFieldProps } from "./types";
import { useTheme } from "../../theme/ThemeProvider";
import DropDownPicker from "react-native-dropdown-picker";

export const DropdownPickerField: React.FC<DropdownPickerFieldProps> = ({
	name,
	label,
	value,
	touched,
	error,
	required,
	onChange,
}) => {
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	]);

	const setState: React.Dispatch<(prevState: any) => any> = (updater) => {
		const prevState = {};
		const newState = updater(prevState);
		onChange(name, newState);
	};

	return (
		<View style={styles.container}>
			{label && (
				<Text style={styles.label}>
					{label}
					{required && <Text style={{ color: theme.blue[500] }}> *</Text>}
				</Text>
			)}

			<DropDownPicker
				open={open}
				value={value}
				items={items}
				placeholder="Gender"
				placeholderStyle={{ color: theme.slate[400] }}
				setOpen={setOpen}
				setValue={setState}
				setItems={setItems}
				style={[
					styles.dropdown,
					{
						borderColor:
							touched && error ? theme.icon.danger.tertiary : theme.slate[500],
					},
				]}
				containerStyle={{
					zIndex: 1,
				}}
				dropDownContainerStyle={{
					zIndex: 1,
					borderColor: theme.gray[200],
					borderWidth: 1,
				}}
			/>

			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};
