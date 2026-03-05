import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
	StyleProp,
} from "react-native";
import CircularImage from "../../../components/CircularImage";
import { RecordItemUI } from "../model/RecordListItem";
import { useTheme } from "../../../theme/ThemeProvider";
import { mdiAccountMultipleOutline, mdiCheckCircleOutline } from "@mdi/js";
import MdiIcon from "../../../components/MdiIcon";
import Badge from "./components/Badge/Badge";

interface Props {
	user: RecordItemUI;
	isForNetwork?: boolean;
	isCurrent?: boolean;
	onPress?: (id: number) => void;
	style?: StyleProp<ViewStyle> | undefined;
}

const UserListItem = ({
	user,
	isForNetwork = false,
	isCurrent = false,
	onPress,
	style,
}: Props) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: theme.background }, style]}
			onPress={() => onPress && onPress(user.id)}
			disabled={isCurrent}
		>
			<CircularImage uri={""} size={45} fallbackText={user.fallbackText} />
			<View style={styles.flex}>
				<Text style={[styles.text, { color: theme.text }]}>
					{`${user.fullName}${!!!isForNetwork ? `, ${user.age}` : ""}`}
				</Text>
				<Text style={[styles.detailText, { color: theme.text }]}>
					{user.ministryText}
				</Text>
			</View>
			<View style={{ alignItems: "flex-end", gap: 8 }}>
				{!!!isCurrent && (
					<Badge type={user.membershipType} dleader={user.dleaderName} />
				)}
				{!!!isForNetwork && (
					<View style={{ alignItems: "flex-end", gap: 2 }}>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
						>
							<MdiIcon
								path={mdiAccountMultipleOutline}
								size={12}
								color={user.dleaderName ? theme.gray[500] : theme.error}
							/>
							<Text
								style={[
									styles.detailText,
									{
										color: user.dleaderName ? theme.gray[500] : theme.error,
									},
								]}
							>
								{user.dleaderName ? user.dleaderName : "Pending"}
							</Text>
						</View>

						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
						>
							<MdiIcon
								path={mdiCheckCircleOutline}
								size={12}
								color={theme.textPositive.secondary}
							/>
							<Text
								style={[
									styles.detailText,
									{ color: theme.textPositive.secondary },
								]}
							>
								Active Member
							</Text>
						</View>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	card: {
		padding: 16,
		borderRadius: 8,
		height: 100,
		flexDirection: "row",
		columnGap: 12,
		marginHorizontal: 16,
		alignItems: "center",
	},
	text: {
		lineHeight: 20,
		fontSize: 14,
		fontWeight: "semibold",
		flexWrap: "wrap",
	},
	detailText: { fontSize: 12, lineHeight: 16, fontWeight: "normal" },
	membershipTypeText: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: "bold",
		textAlign: "center",
		textAlignVertical: "center",
		borderRadius: 4.5,
		height: 22,
		width: 70,
	},
});

export default UserListItem;
