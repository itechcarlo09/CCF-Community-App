import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import MdiIcon from "@components/MdiIcon";
import { mdiAccountGroupOutline, mdiPencil, mdiDelete } from "@mdi/js";
import MinistryPageHeader from "./components/MinistryPageHeader";

interface Ministry {
	id: string;
	name: string;
	icon?: string;
	vision?: string;
	mission?: string;
	description?: string;
	head?: string;
	activeMembers?: number;
	priorityCount?: number;
}

const initialMinistries: Ministry[] = [
	{
		id: "1",
		name: "B1G Ministry",
		icon: mdiAccountGroupOutline,
		vision: "Transform the next generation",
		mission: "To disciple youth and young adults",
		description: "Dedicated to reaching and discipling young adults",
		head: "Pastor Mark",
		activeMembers: 25,
		priorityCount: 12,
	},
	{
		id: "2",
		name: "Elevate Ministry",
		icon: mdiAccountGroupOutline,
		vision: "Empower youth",
		mission: "Spiritual growth",
		description: "Focused on young adult ministry",
		head: "Pastor Lisa",
		activeMembers: 30,
		priorityCount: 15,
	},
];

export const MinistryPage = ({ navigation }: any) => {
	const [ministries, setMinistries] = useState<Ministry[]>(initialMinistries);

	const deleteMinistry = (id: string) => {
		setMinistries((prev) => prev.filter((m) => m.id !== id));
	};

	const renderItem = ({ item }: { item: Ministry }) => (
		<View style={styles.card}>
			{/* Edit/Delete buttons */}
			<View style={styles.topActions}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("EditMinistry", { ministry: item })
					}
				>
					<MdiIcon path={mdiPencil} size={22} color="#4f46e5" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => deleteMinistry(item.id)}>
					<MdiIcon path={mdiDelete} size={22} color="#e74c3c" />
				</TouchableOpacity>
			</View>

			{/* Header: Icon + Name */}
			<View style={styles.header}>
				{item.icon && <MdiIcon path={item.icon} size={36} color="#4f46e5" />}
				<View style={{ marginLeft: 12, flex: 1 }}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.head}>Head: {item.head}</Text>
				</View>
			</View>

			{/* Mission / Vision */}
			<View style={styles.missionVision}>
				<Text style={styles.mission}>Mission: {item.mission}</Text>
				<Text style={styles.vision}>Vision: {item.vision}</Text>
			</View>

			{/* Description */}
			<Text style={styles.description}>{item.description}</Text>

			{/* Stats badges */}
			<View style={styles.statsRow}>
				<View style={[styles.badge, { backgroundColor: "#4f46e5" }]}>
					<Text style={styles.badgeText}>Active: {item.activeMembers}</Text>
				</View>
				<View style={[styles.badge, { backgroundColor: "#22c55e" }]}>
					<Text style={styles.badgeText}>Priority: {item.priorityCount}</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<MinistryPageHeader
				title="Ministries"
				onBack={() => navigation.goBack()}
				onAdd={() => navigation.navigate("CreateMinistry")}
			/>

			<FlatList
				data={ministries}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={{ padding: 12 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 16,
		elevation: 3,
		position: "relative",
	},
	topActions: {
		position: "absolute",
		right: 12,
		top: 12,
		flexDirection: "row",
		gap: 12,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	name: { fontSize: 18, fontWeight: "bold", color: "#111827" },
	head: { fontSize: 14, color: "#6B7280", marginTop: 2 },
	missionVision: { marginBottom: 8 },
	mission: { fontSize: 14, color: "#374151" },
	vision: { fontSize: 14, color: "#374151" },
	description: { color: "#4B5563", marginBottom: 12 },
	statsRow: { flexDirection: "row", gap: 8 },
	badge: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 12,
	},
	badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
