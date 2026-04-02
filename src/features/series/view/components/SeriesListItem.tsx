import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SeriesItemUI } from "../../model/SeriesItemUI";

interface Props {
	item: SeriesItemUI;
}

export const SeriesCard: React.FC<Props> = ({ item }) => {
	return (
		<View style={styles.card} key={item.id}>
			{/* Series Name */}
			<Text style={styles.name}>{item.title}</Text>

			{/* Ministry */}
			<Text style={styles.ministry}>{item.ministry}</Text>

			{/* Description */}
			{!!item.description && (
				<Text style={styles.description} numberOfLines={3}>
					{item.description}
				</Text>
			)}

			{/* Sessions and Dates */}
			<View style={styles.infoRow}>
				<View style={styles.infoItem}>
					<Text style={styles.infoLabel}>Sessions</Text>
					<Text style={styles.infoValue}>{item.numberOfSessions}</Text>
				</View>
				<View style={styles.infoItem}>
					<Text style={styles.infoLabel}>Dates</Text>
					<Text style={styles.infoValue}>{item.duration}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 16,
		marginHorizontal: 16,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
	},
	name: {
		fontSize: 18,
		fontWeight: "700",
		color: "#222",
		marginBottom: 4,
	},
	ministry: {
		fontSize: 14,
		color: "#666",
		marginBottom: 6,
	},
	description: {
		fontSize: 13,
		color: "#777",
		marginBottom: 12,
		lineHeight: 18,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	infoItem: {
		flex: 1,
	},
	infoLabel: {
		fontSize: 12,
		color: "#999",
	},
	infoValue: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
		marginTop: 2,
	},
});
