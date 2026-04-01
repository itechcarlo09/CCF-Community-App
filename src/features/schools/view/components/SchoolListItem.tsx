import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SchoolItemUI } from "../../model/SchoolListItem";

interface Props {
	item: SchoolItemUI;
	onPress?: (item: SchoolItemUI) => void;
}

const SchoolCard: React.FC<Props> = ({ item, onPress }) => {
	const getAcronym = (acronym?: string, name?: string) => {
		if (acronym && acronym.trim().length > 0) {
			return acronym.toUpperCase();
		}

		if (!name) return "";

		return name
			.split(" ")
			.filter((word) => word.length > 0)
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	};

	return (
		<TouchableOpacity
			style={styles.card}
			activeOpacity={0.8}
			onPress={() => onPress?.(item)}
		>
			{/* Logo */}
			<View style={styles.logoContainer}>
				{item.logo ? (
					<Image source={{ uri: item.logo }} style={styles.logo} />
				) : (
					<View style={styles.placeholderLogo}>
						<Text style={styles.logoText}>
							{getAcronym(item.acronym, item.name)}
						</Text>
					</View>
				)}
			</View>

			{/* Middle Content */}
			<View style={styles.content}>
				<Text style={styles.name} numberOfLines={1}>
					{item.name}
				</Text>
				<Text style={styles.acronym}>{item.acronym}</Text>
				<Text style={styles.location} numberOfLines={1}>
					{item.location}
				</Text>
			</View>

			{/* Right Stats */}
			<View style={styles.stats}>
				<View style={styles.statItem}>
					<Text style={styles.statValue}>{item.currentCount}</Text>
					<Text style={styles.statLabel}>Students</Text>
				</View>

				<View style={styles.divider} />

				<View style={styles.statItem}>
					<Text style={styles.statValue}>{item.alumniCount}</Text>
					<Text style={styles.statLabel}>Alumni</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default SchoolCard;

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 14,
		marginHorizontal: 16,
		borderRadius: 16,
		backgroundColor: "#fff",

		// Modern shadow
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 4 },
		elevation: 3,
	},

	logoContainer: {
		marginRight: 12,
	},

	logo: {
		width: 50,
		height: 50,
		borderRadius: 12,
	},

	placeholderLogo: {
		width: 50,
		height: 50,
		borderRadius: 12,
		backgroundColor: "#E5E7EB",
		alignItems: "center",
		justifyContent: "center",
	},

	logoText: {
		fontWeight: "bold",
		fontSize: 14,
		color: "#374151",
	},

	content: {
		flex: 1,
		justifyContent: "center",
	},

	name: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111827",
	},

	acronym: {
		fontSize: 12,
		color: "#6B7280",
		marginTop: 2,
	},

	location: {
		fontSize: 12,
		color: "#9CA3AF",
		marginTop: 2,
	},

	stats: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
	},

	statItem: {
		alignItems: "center",
		minWidth: 60,
	},

	statValue: {
		fontSize: 14,
		fontWeight: "700",
		color: "#111827",
	},

	statLabel: {
		fontSize: 11,
		color: "#6B7280",
	},

	divider: {
		width: 1,
		height: 30,
		backgroundColor: "#E5E7EB",
		marginHorizontal: 8,
	},
});
