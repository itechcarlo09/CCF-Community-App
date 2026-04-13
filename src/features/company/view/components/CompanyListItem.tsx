import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CompanyItemUI } from "../../model/CompanyListUI";

interface Props {
	item: CompanyItemUI;
	onPress?: (item: CompanyItemUI) => void;
	isCountsShown: boolean;
}

const getAcronym = (acronym?: string, name?: string) => {
	if (acronym && acronym.trim()) {
		return acronym.toUpperCase();
	}

	if (!name) return "";

	const skipWords = ["of", "the", "and", "in"];

	return name
		.split(" ")
		.filter(
			(word) => word.length > 0 && !skipWords.includes(word.toLowerCase()),
		)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

const CompanyCard: React.FC<Props> = ({
	item,
	onPress,
	isCountsShown = true,
}) => {
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

			{/* Content */}
			<View style={styles.content}>
				<Text style={styles.name}>{item.name}</Text>

				<Text style={styles.acronym}>
					{getAcronym(item.acronym, item.name)}
				</Text>

				<Text style={styles.address} numberOfLines={1}>
					{item.address}
				</Text>
			</View>

			{/* Stats */}
			{isCountsShown && (
				<View style={styles.stats}>
					<View style={styles.statItem}>
						<Text style={styles.statValue}>{item.employeeCount}</Text>
						<Text style={styles.statLabel}>Employees</Text>
					</View>

					<View style={styles.divider} />

					<View style={styles.statItem}>
						<Text style={styles.statValue}>{item.pastCount}</Text>
						<Text style={styles.statLabel}>Past</Text>
					</View>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default CompanyCard;

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 14,
		marginHorizontal: 16,
		borderRadius: 16,
		backgroundColor: "#fff",

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

	address: {
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
