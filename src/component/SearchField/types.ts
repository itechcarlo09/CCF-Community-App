import { TextInputProps } from "react-native";

export interface CustomSearchFieldProps extends TextInputProps {
	value: string;
	onCancel: (value: string) => void;
}
