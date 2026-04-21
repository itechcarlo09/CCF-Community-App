import { ViewStyle, StyleProp } from "react-native";

export interface MDIIconProps {
	path: string;
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
	isForDelete?: boolean;
}
