import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import { useEventViewModel } from "../viewModel/useEventViewModel";
import { useTheme } from "../../../theme/ThemeProvider";
import MdiIcon from "../../../components/MdiIcon";
import { mdiPlusBoxOutline } from "@mdi/js";
import Loading from "../../../components/Loading";
import { EventItemCard } from "./EventItemCard";
import { SearchField } from "../../../components/SearchField";
import useDebounce from "../../user/hooks/useDebounce";

const Separator = () => <View style={styles.separator} />;

const EventListScreen = ({ navigation }: any) => {
	const {
		events,
		refresh,
		loading,
		searchEvents,
		activityLoading,
		loadMoreEvents,
	} = useEventViewModel();

	const { theme } = useTheme();
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	const [
		onEndReachedCalledDuringMomentum,
		setOnEndReachedCalledDuringMomentum,
	] = useState(false);

	useEffect(() => {
		searchEvents(debouncedSearchTerm);
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
			{/* Top Controls */}
			<View style={styles.topControls}>
				<SearchField
					value={search}
					onChangeText={setSearch}
					onCancel={() => setSearch("")}
				/>

				{/* Add Event Button */}
				<TouchableOpacity
					style={styles.addButton}
					onPress={() =>
						navigation.navigate("EventNavigator", {
							screen: "EventForm",
							params: { onSuccess: onRefresh },
						})
					}
				>
					<MdiIcon path={mdiPlusBoxOutline} size={22} color={theme.gray[800]} />
				</TouchableOpacity>
			</View>

			{/* Event List */}
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={events}
					ItemSeparatorComponent={Separator}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item }) => (
						<EventItemCard
							item={item}
							onPressEdit={() => handleEdit(item)}
							onPressSeries={() => handleSeries(item)}
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
							loadMoreEvents();
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

export default EventListScreen;
