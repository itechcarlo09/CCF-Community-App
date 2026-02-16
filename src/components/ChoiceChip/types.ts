import { ButtonProps, TextStyle } from "react-native";
import { DropdownOption } from "../../types/dropdownOption";

export interface ChoiceChipProps extends ButtonProps {
	name: string;
	label?: string;
	options: DropdownOption<string>[];
	textStyle?: TextStyle;
	required?: boolean;
	value: string | null;
	touched?: boolean;
	error?: string;
	onChange: (field: string, value: string | null) => void;
}
