import { ViewStyle, StyleProp } from "react-native";
import { MembershipType } from "../../../types";

export interface BadgeProps {
	type: MembershipType;
	dleader?: string | null;
}
