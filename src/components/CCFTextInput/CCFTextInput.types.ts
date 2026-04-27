import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface CCFTextInputProps extends TextInputProps {
	isPassword?: boolean;
	error?: string;
	touched?: boolean;
	disabled?: boolean;
	isSearch?: boolean;
	containerStyle?: StyleProp<ViewStyle> | undefined;
}
