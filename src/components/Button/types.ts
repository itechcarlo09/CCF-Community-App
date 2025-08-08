import {
	ViewStyle,
	TextStyle,
	GestureResponderEvent,
	StyleProp,
} from "react-native";

export interface CustomButtonProps {
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	loading?: boolean;
	style?: StyleProp<ViewStyle> | undefined;
	textStyle?: TextStyle;
}
