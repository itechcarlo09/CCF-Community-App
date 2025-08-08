import { ValueType } from "react-native-dropdown-picker";

export interface DropdownPickerFieldProps {
	name: string;
	label?: string;
	value: ValueType | null;
	touched?: boolean;
	error?: string;
	required?: boolean;
	onChange: (field: string, value: any) => void;
}
