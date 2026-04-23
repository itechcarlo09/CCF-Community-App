import { TextInputProps } from "react-native";

export interface CCFTextInputProps extends TextInputProps {
	isPassword?: boolean;
	error?: string;
	touched?: boolean;
	disabled?: boolean;
}
