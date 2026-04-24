import { StyleProp, ViewStyle } from "react-native";

export interface ShadowCardProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>; // inner card style
	containerStyle?: StyleProp<ViewStyle>; // outer shadow wrapper
}
