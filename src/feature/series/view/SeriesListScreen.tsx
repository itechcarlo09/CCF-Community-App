import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import Header from "@component/Header";
import Loading from "@component/Loading";
import { useTheme } from "@theme/ThemeProvider";
import { Separator } from "@component/Separator";
import useDebounce from "src/feature/user/hooks/useDebounce";
import { SeriesCard } from "./components/SeriesListItem";
import { useSeriesViewModel } from "../viewModel/userSeriesViewModel";

export const SeriesListScreen = ({ navigation }: any) => {
	const {
		series,
		refresh,
		loading,
		activityLoading,
		loadMoreSeries,
		searchSeries,
	} = useSeriesViewModel();
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	useEffect(() => {
		searchSeries(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

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

	return (
		<View style={[styles.container, { backgroundColor: theme.gray[50] }]}>
			<Header
				title="Series"
				placeholder="Search series..."
				onSearch={setSearch}
				onBack={() => navigation.goBack()}
				onAdd={() => navigation.navigate("CreateMinistryScreen")}
			/>

			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={series}
					keyExtractor={(item) => String(item.id)}
					ItemSeparatorComponent={Separator}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item }) => <SeriesCard item={item} />}
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
							loadMoreSeries();
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
