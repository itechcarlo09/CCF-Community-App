import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CircularImage from "../../../components/CircularImage";
import { RecordItemUI } from "../model/RecordListItem";
import { useTheme } from "../../../theme/ThemeProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { mdiAccountMultipleOutline, mdiAlertCircle } from "@mdi/js";
import Svg, { Path } from "react-native-svg";
import MdiIcon from "../../../components/MdiIcon";

interface Props {
	user: RecordItemUI;
	onPress: (id?: string) => void;
}

const UserListItem = ({ user, onPress }: Props) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: theme.background }]}
			onPress={() => onPress(user.id)}
		>
			<CircularImage uri={""} size={45} fallbackText={user.fallbackText} />
			<View style={styles.flex}>
				<Text style={[styles.text, { color: theme.text }]}>
					{user.fullName}, {user.age}
				</Text>
				<Text style={[styles.detailText, { color: theme.text }]}>
					{user.ministryText}
				</Text>
			</View>
			<View style={{ alignItems: "flex-end", gap: 8 }}>
				<Text
					style={[
						styles.membershipTypeText,
						{
							color: theme.badge.primary.text,
							backgroundColor: theme.badge.primary.background,
						},
					]}
				>
					DMember
				</Text>
				<View style={{ alignItems: "flex-end", gap: 2 }}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
						<MdiIcon
							path={mdiAccountMultipleOutline}
							size={12}
							color={theme.gray[500]}
						/>
						<Text style={[styles.detailText, { color: theme.gray[500] }]}>
							DLeader's Name
						</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
						<MdiIcon
							path={mdiAlertCircle}
							size={12}
							color={theme.textDanger.onDanger.secondary}
						/>
						<Text
							style={[
								styles.detailText,
								{ color: theme.textDanger.onDanger.secondary },
							]}
						>
							Active Member
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	card: {
		padding: 16,
		marginVertical: 8,
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
