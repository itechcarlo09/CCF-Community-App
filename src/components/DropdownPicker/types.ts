import { ViewStyle } from "react-native";
import { DropDownDirectionType, ValueType } from "react-native-dropdown-picker";
import { DropdownOption } from "../../types/dropdownOption";

export interface DropdownPickerFieldProps {
	name: string;
	label?: string;
	value: ValueType | null;
	touched?: boolean;
	error?: string;
	required?: boolean;
	containerStyle?: ViewStyle;
	onChange: (field: string, value: any) => void;
	options: DropdownOption<string>[];
	searchable?: boolean;
	placeholder?: string;
	dropDownDirection?: DropDownDirectionType;
}
