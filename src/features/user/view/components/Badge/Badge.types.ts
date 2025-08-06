import { ViewStyle, StyleProp } from "react-native";
import { MembershipType } from "../../../types";

export interface BadgeProps {
	type: MembershipType;
	path: string;
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
}
