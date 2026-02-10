import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { ElementDropdownProps } from "./types";
import { useTheme } from "../../theme/ThemeProvider";
import { DropdownOption } from "../../types/dropdownOption";
import { Dropdown } from "react-native-element-dropdown";

export const DropdownPickerField: React.FC<ElementDropdownProps> = ({
	name,
	label,
	valueField,
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
	const [isFocus, setIsFocus] = useState(false);
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
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={items}
				search={searchable}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={placeholder}
				searchPlaceholder="Search..."
				value={valueField}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setState(item.value);
					setIsFocus(false);
				}}
			/>
			{/* <DropDownPicker
				open={open}
				searchable={searchable}
				value={value}
				listMode="SCROLLVIEW"
				items={items}
				dropDownDirection={dropDownDirection || "BOTTOM"}
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
					// TODO: change the package of Dropdown from "@react-native-dropdown-picker" to "@react-native-element-dropdown"
					// because of this, the dropdown causes to push all the items below.
					...(Platform.OS == "android" && { position: "relative", top: 0 }),
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
			/> */}

			{touched && error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};
