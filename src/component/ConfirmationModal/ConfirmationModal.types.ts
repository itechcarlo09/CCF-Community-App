import { ViewStyle, StyleProp, GestureResponderEvent } from "react-native";

export interface ConfirmationModalProps {
	visible: boolean;
	title?: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
}
