import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import { styles } from "./styles";
import { DropdownPickerFieldProps } from "./types";
import { useTheme } from "../../theme/ThemeProvider";
import DropDownPicker from "react-native-dropdown-picker";
import { DropdownOption } from "../../types/dropdownOption";
import MdiIcon from "../MdiIcon";
import { mdiMagnify } from "@mdi/js";

export const DropdownPickerField: React.FC<DropdownPickerFieldProps> = ({
	name,
	label,
	value,
	touched,
	error,
	required,
	containerStyle,
	onChange,
	options,
	searchable,
	placeholder,
}) => {
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState<DropdownOption<string>[]>(options);

	const setState: React.Dispatch<(prevState: any) => any> = (updater) => {
		const prevState = {};
		const newState = updater(prevState);
		onChange(name, newState);
	};

	useEffect(() => {
		setItems(options);
	}, [options]);

	return (
		<View style={containerStyle}>
			{label && (
				<Text style={[styles.label, { color: theme.text }]}>
					{label}
					{required && <Text style={{ color: theme.blue[500] }}> *</Text>}
				</Text>
			)}

			{/* TODO: change the package of Dropdown from "@react-native-dropdown-picker" to "@react-native-element-dropdown" */}
			<DropDownPicker
				open={open}
				searchable={searchable}
				value={value}
				items={items}
				placeholder={placeholder}
				searchPlaceholder="Search DGroup Leader"
				searchPlaceholderTextColor={theme.slate[400]}
				searchTextInputStyle={{
					borderColor: theme.slate[500],
				}}
				placeholderStyle={{ color: theme.slate[400] }}
				setOpen={setOpen}
				setValue={setState}
				setItems={setItems}
				style={[
					styles.dropdown,
					{
						zIndex: 1000,
						borderColor:
							touched && error ? theme.icon.danger.tertiary : theme.slate[500],
					},
				]}
				containerStyle={{
					zIndex: 1,
				}}
				dropDownContainerStyle={{
					zIndex: 1,
					...(Platform.OS === "android" && { position: "relative" }),
					...(Platform.OS === "android" && { top: 0 }),
					borderColor: theme.gray[200],
					borderWidth: 1,
				}}
				{...(searchable
					? {
							ArrowDownIconComponent: () => (
								<MdiIcon path={mdiMagnify} size={24} color="#323232" />
							),
							ArrowUpIconComponent: () => (
								<MdiIcon path={mdiMagnify} size={24} color="#323232" />
							),
					  }
					: {})}
			/>

			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};
