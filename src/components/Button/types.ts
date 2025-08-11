import { ReactNode } from "react";
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
	icon?: ReactNode; // 🆕 can pass any icon component
	iconPosition?: "left" | "right"; // 🆕 where to place it
}
