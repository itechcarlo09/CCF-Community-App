import { TextInputProps } from "react-native";

export interface TextFieldProps extends TextInputProps {
	name: string;
	label?: string;
}
