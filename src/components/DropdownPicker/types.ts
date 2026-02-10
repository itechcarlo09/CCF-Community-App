import { ViewStyle } from "react-native";
import { DropdownOption } from "../../types/dropdownOption";

export interface ElementDropdownProps<T = any> {
	name: string;
	label?: string;
	labelField: string; // key in data for display text
	valueField: string; // key in data for value
	touched?: boolean;
	error?: string;
	required?: boolean;
	containerStyle?: ViewStyle;
	onChange: (field: string, value: string) => void;
	options: DropdownOption<string>[];
	searchable?: boolean;
	placeholder?: string;
}
