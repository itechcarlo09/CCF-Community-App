import { ButtonProps, ViewStyle } from "react-native";

export interface CCFButtonProps extends ButtonProps {
	loading?: boolean;
	style?: ViewStyle;
}
