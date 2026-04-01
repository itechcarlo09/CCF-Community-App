import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import Loading from "../../../components/Loading";
import useDebounce from "../../user/hooks/useDebounce";
import Header from "@components/Header";
import DGroupListCard from "./components/DGroupListCard";
import { useDGroupViewModel } from "../viewModel/userDGroupViewModel";
import { Separator } from "@components/Separator";

const DGroupListScreen = ({ navigation }: any) => {
	const {
		dgroups,
		refresh,
		loading,
		activityLoading,
		searchDGroups,
		loadMoreDGroups,
	} = useDGroupViewModel();

	const { theme } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	const [
		onEndReachedCalledDuringMomentum,
		setOnEndReachedCalledDuringMomentum,
	] = useState(false);

	useEffect(() => {
		searchDGroups(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refresh();
		setRefreshing(false);
	}, [refresh]);

	const handleEdit = (item: any) => {
		navigation.navigate("EventNavigator", {
			screen: "EventForm",
			params: { eventId: item.id, onSuccess: onRefresh },
		});
	};

	const handleSeries = (item: any) => {
		navigation.navigate("EventNavigator", {
			screen: "SeriesEvents",
			params: { seriesId: item.seriesId },
		});
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.gray[50] }]}>
			<Header
				placeholder="Search DGroup..."
				onAdd={() =>
					navigation.navigate("EventNavigator", {
						screen: "EventForm",
						params: { onSuccess: onRefresh },
					})
				}
				onSearch={setSearch}
			/>

			{/* Event List */}
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={dgroups}
					ItemSeparatorComponent={Separator}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item }) => (
						<DGroupListCard
							groupName={item.groupName}
							leaderName={item.leaderName}
							memberCount={item.memberCount}
							memberTypes={item.memberTypes}
							id={item.id}
						/>
					)}
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
							loadMoreDGroups();
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
	separator: { height: 12 },
	topControls: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
		marginTop: 12,
		marginBottom: 10,
	},
	addButton: {
		height: 42,
		width: 42,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 10,
	},
});

export default DGroupListScreen;
