import { ButtonProps, ViewStyle } from "react-native";

export interface CCFButtonProps extends ButtonProps {
	loading?: boolean;
	style?: ViewStyle;
	variant?: "primary" | "outline";
	icon?: string;
}
