import CircularImage from "@components/CircularImage";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from "react-native";
import { DGroupItemUI } from "../../model/DGroupItemUI";
import { useTheme } from "@theme/ThemeProvider";

interface Props {
	item: DGroupItemUI;
}

const DGroupCard: React.FC<Props> = ({ item }) => {
	const { theme } = useTheme();
	return (
		<View style={styles.card} key={item.id}>
			{/* LEFT SIDE */}
			<View style={styles.left}>
				<View style={styles.avatar}>
					<CircularImage
						uri={item.leaderImageUrl}
						size={45}
						fallbackText={""}
					/>
				</View>

				<View style={styles.textContainer}>
					<Text
						style={[styles.groupName, { color: theme.text }]}
						numberOfLines={1}
					>
						{item.groupName}
					</Text>

					<Text style={styles.leaderName}>{`${
						item.gender === "Couples"
							? "👨👩"
							: item.gender === "Male"
							? "👨"
							: "👩"
					} ${item.leadersName}`}</Text>

					{item.leaderProfileUrl && (
						<TouchableOpacity
							onPress={() =>
								item.leaderProfileUrl && Linking.openURL(item.leaderProfileUrl)
							}
						>
							<Text style={styles.link}>View Profile</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>

			{/* RIGHT SIDE */}
			<View style={styles.right}>
				<Text style={[styles.memberCount, { color: theme.text }]}>
					{item.gender === "Couples" ? item.memberCount / 2 : item.memberCount}
				</Text>
				<Text style={styles.memberLabel}>
					{item.gender === "Couples" ? "Couples" : "Members"}
				</Text>

				<View style={styles.tags}>
					{item.memberTypes.map((type, i) => (
						<View key={i} style={styles.tag}>
							<Text style={styles.tagText}>{type}</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

export default DGroupCard;

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		padding: 14,
		borderRadius: 18,
		marginHorizontal: 16,

		// modern shadow
		elevation: 3,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 10,
	},

	left: {
		flexDirection: "row",
		flex: 1,
	},

	avatar: { marginRight: 12, justifyContent: "center" },

	textContainer: {
		flex: 1,
		justifyContent: "center",
	},

	groupName: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 2,
	},

	leaderName: {
		fontSize: 13,
		color: "#666",
	},

	link: {
		fontSize: 12,
		color: "#3b82f6",
		marginTop: 2,
	},

	right: {
		alignItems: "flex-end",
		justifyContent: "center",
	},

	memberCount: {
		fontSize: 20,
		fontWeight: "700",
	},

	memberLabel: {
		fontSize: 11,
		color: "#888",
		marginBottom: 6,
	},

	tags: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-end",
	},

	tag: {
		backgroundColor: "#f1f5f9",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 10,
		marginLeft: 4,
		marginTop: 2,
	},

	tagText: {
		fontSize: 10,
		color: "#475569",
		fontWeight: "500",
	},
});
