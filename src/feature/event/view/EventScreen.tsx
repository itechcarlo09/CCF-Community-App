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
import EventListItem from "./EventListItem";
import useDebounce from "../../user/hooks/useDebounce";
import { SearchField } from "../../../component/SearchField";
import MdiIcon from "../../../component/MdiIcon";
import { mdiPlusBoxOutline } from "@mdi/js";
import Loading from "../../../component/Loading";
import { EventItemCard } from "./EventItemCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Separator = () => <View style={styles.separator} />;

const EventScreen = ({ navigation }: any) => {
	const {
		events,
		refresh,
		loading,
		searchEvents,
		activityLoading,
		loadMoreEvents,
	} = useEventViewModel();
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const { theme } = useTheme();
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);
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

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.sortContainer}>
				<View style={[styles.sortBox, { backgroundColor: theme.gray[200] }]}>
					{/* <Text style={[styles.sortText, { color: theme.gray[900] }]}>
						Sort
					</Text> */}
					{/* <DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						style={[
							styles.dropdown,
							{ borderColor: theme.gray[200], borderWidth: 2 },
						]}
						containerStyle={{
							zIndex: 1000,
							width: 164,
						}}
						dropDownContainerStyle={{
							zIndex: 1000,
							borderColor: theme.gray[200],
							borderWidth: 2,
						}}
					/> */}
				</View>
				<SearchField
					onChangeText={(value) => setSearch(value)}
					value={search}
					onCancel={() => setSearch("")}
				/>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() =>
						navigation.navigate("EventNavigator", {
							screen: "EventForm",
							params: {
								onSuccess: onRefresh,
							},
						})
					}
				>
					<MdiIcon path={mdiPlusBoxOutline} size={18} color={"#323232"} />
				</TouchableOpacity>
			</View>
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={events}
					ItemSeparatorComponent={Separator}
					refreshControl={Refresh()}
					renderItem={({ item }) => <EventItemCard item={item} />}
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
	container: { flex: 1, justifyContent: "center" },
	text: { fontSize: 18, fontWeight: "bold", color: "#fff" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	card: {
		elevation: 6,
		padding: 16,
		marginVertical: 8,
		backgroundColor: "#c00b0bff",
		borderRadius: 8,
	},
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 14, color: "gray" },
	separator: {
		height: 12,
	},
	sortContainer: {
		marginBottom: 10,
		marginTop: 12,
		marginHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	sortBox: {
		height: 40,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	addButton: {
		height: 42,
		width: 42,
		justifyContent: "center",
		marginLeft: 10,
	},
});

export default EventScreen;
