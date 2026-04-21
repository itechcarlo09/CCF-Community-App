import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface SeriesButtonProps {
	name: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}
