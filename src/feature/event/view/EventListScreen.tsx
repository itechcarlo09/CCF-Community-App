import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import { useEventViewModel } from "../viewModel/useEventViewModel";
import { useTheme } from "../../../theme/ThemeProvider";
import Loading from "../../../component/Loading";
import { EventItemCard } from "./EventItemCard";
import useDebounce from "../../user/hooks/useDebounce";
import Header from "@component/Header";
import { Separator } from "@component/Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
	const insets = useSafeAreaInsets();
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
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.gray[50], paddingTop: insets.top },
			]}
		>
			<Header
				placeholder="Search event..."
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
