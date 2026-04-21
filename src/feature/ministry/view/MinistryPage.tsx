import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import MdiIcon from "@component/MdiIcon";
import { mdiAccountGroupOutline, mdiPencil, mdiDelete } from "@mdi/js";
import Header from "@component/Header";
import Loading from "@component/Loading";
import { useMinistryViewModel } from "../viewModel/useMinistryViewModel";
import { MinistryItemUI } from "../model/MinistryListItem";
import { useTheme } from "@theme/ThemeProvider";
import { Separator } from "@component/Separator";

export const MinistryPage = ({ navigation }: any) => {
	const { ministries, refresh, loading, activityLoading, loadMoreMinistries } =
		useMinistryViewModel();

	// const deleteMinistry = (id: string) => {
	// 	setMinistries((prev) => prev.filter((m) => m.id !== id));
	// };

	const { theme } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const [
		onEndReachedCalledDuringMomentum,
		setOnEndReachedCalledDuringMomentum,
	] = useState(false);
	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refresh();
		setRefreshing(false);
	}, [refresh]);

	const renderItem = ({ item }: { item: MinistryItemUI }) => (
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
				{/* <TouchableOpacity onPress={() => deleteMinistry(item.id)}>
					<MdiIcon path={mdiDelete} size={22} color="#e74c3c" />
				</TouchableOpacity> */}
			</View>

			{/* Header: Icon + Name */}
			<View style={styles.header}>
				<MdiIcon
					path={item.icon ? item.icon : mdiAccountGroupOutline}
					size={36}
					color="#4f46e5"
				/>
				<View style={{ marginLeft: 12, flex: 1 }}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.head}>Head: {item.ministryHead}</Text>
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
					<Text style={styles.badgeText}>Active: {item.activeVolunteer}</Text>
				</View>
				<View style={[styles.badge, { backgroundColor: "#22c55e" }]}>
					<Text style={styles.badgeText}>
						Priority: {item.priorityVolunteer}
					</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View style={[styles.container, { backgroundColor: theme.gray[50] }]}>
			<Header
				title="Ministries"
				onBack={() => navigation.goBack()}
				onAdd={() => navigation.navigate("CreateMinistryScreen")}
			/>

			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={ministries}
					ItemSeparatorComponent={Separator}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={renderItem}
					ListHeaderComponent={<View style={{ height: 6 }} />}
					ListFooterComponent={
						activityLoading ? (
							<ActivityIndicator style={{ marginVertical: 16 }} size="large" />
						) : (
							<View style={{ height: 16 }} />
						)
					}
					onEndReached={() => {
						if (
							!onEndReachedCalledDuringMomentum &&
							!activityLoading &&
							!loading
						) {
							loadMoreMinistries();
							setOnEndReachedCalledDuringMomentum(true);
						}
					}}
					onEndReachedThreshold={0.1}
					onMomentumScrollBegin={() => {
						setOnEndReachedCalledDuringMomentum(false);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginHorizontal: 16,
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
