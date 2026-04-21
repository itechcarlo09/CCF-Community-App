import { TextStyle } from "react-native";
import { SelectionProps } from "src/types/selectionTypes";

export interface ChoiceChipProps {
	name: string;
	label?: string;
	options: SelectionProps<string>[];
	textStyle?: TextStyle;
	required?: boolean;
	value: string | null;
	touched?: boolean;
	error?: string;
	disabled?: boolean;
	onChange: (field: string, value: string | null) => void;
}
