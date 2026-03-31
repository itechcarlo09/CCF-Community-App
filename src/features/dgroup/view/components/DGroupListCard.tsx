import CircularImage from "@components/CircularImage";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from "react-native";

interface Props {
	groupName: string;
	leaderName: string;
	memberCount: number;
	leaderImageUrl?: string;
	leaderProfileUrl?: string;
	memberTypes: string[];
}

const DGroupCard: React.FC<Props> = ({
	groupName,
	leaderName,
	memberCount,
	leaderImageUrl,
	leaderProfileUrl,
	memberTypes,
}) => {
	return (
		<View style={styles.card}>
			{/* LEFT SIDE */}
			<View style={styles.left}>
				<View style={styles.avatar}>
					<CircularImage uri={leaderImageUrl} size={45} fallbackText={""} />
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.groupName} numberOfLines={1}>
						{groupName}
					</Text>

					<Text style={styles.leaderName}>👤 {leaderName}</Text>

					{leaderProfileUrl && (
						<TouchableOpacity onPress={() => Linking.openURL(leaderProfileUrl)}>
							<Text style={styles.link}>View Profile</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>

			{/* RIGHT SIDE */}
			<View style={styles.right}>
				<Text style={styles.memberCount}>{memberCount}</Text>
				<Text style={styles.memberLabel}>Members</Text>

				<View style={styles.tags}>
					{memberTypes.map((type, i) => (
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
		marginVertical: 10,
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
