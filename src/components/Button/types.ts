import { ViewStyle, TextStyle, GestureResponderEvent } from "react-native";

export interface CustomButtonProps {
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	loading?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
}
