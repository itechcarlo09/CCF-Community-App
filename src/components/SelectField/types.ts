import {
	ViewStyle,
	TextStyle,
	GestureResponderEvent,
	StyleProp,
} from "react-native";

export interface CustomSelectFieldProps {
	name: string;
	label?: string;
	required?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle> | undefined;
	textStyle?: TextStyle;
	value?: string;
	error?: string;
}
