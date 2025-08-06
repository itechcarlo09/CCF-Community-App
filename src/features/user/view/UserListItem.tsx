import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CircularImage from "../../../components/CircularImage";
import { RecordItemUI } from "../model/RecordListItem";
import { useTheme } from "../../../theme/ThemeProvider";
import { mdiAccountMultipleOutline, mdiCheckCircleOutline } from "@mdi/js";
import MdiIcon from "../../../components/MdiIcon";
import Badge from "./components/Badge/Badge";

interface Props {
	user: RecordItemUI;
	onPress: (id?: number) => void;
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
				<Badge type={user.membershipType} path={""} />
				<View style={{ alignItems: "flex-end", gap: 2 }}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
						<MdiIcon
							path={mdiAccountMultipleOutline}
							size={12}
							color={theme.gray[500]}
						/>
						<Text style={[styles.detailText, { color: theme.gray[500] }]}>
							{user.dleaderName ? user.dleaderName : "Pending"}
						</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
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
