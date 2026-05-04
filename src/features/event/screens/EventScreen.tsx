import { useTheme } from "@theme/ThemeProvider";
import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	RefreshControl,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator } from "@component/Separator";
import { AppStackParamList } from "src/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CCFHeader from "@components/CCFHeader";
import { MemberCardProps } from "@features/member/components/MemberItem";
import MinistryCard from "../components/MinistryCard";
import dayjs from "dayjs";
import { useEventViewModel } from "../viewModel/useEventViewModel";

type UserRouteProp = RouteProp<AppStackParamList, "UserNavigator">;
type NavProp = NativeStackNavigationProp<AppStackParamList>;
const getRandomStatus = (): MemberCardProps["status"] => {
	const statuses: MemberCardProps["status"][] = [
		"Active",
		"Inactive",
		"Pending",
	];
	const randomIndex = Math.floor(Math.random() * statuses.length);

	return statuses[randomIndex];
};

const EventScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const {
		events,
		refresh,
		loading,
		searchEvents,
		activityLoading,
		loadMoreEvents,
	} = useEventViewModel();
	const [searchText, setSearchText] = useState("");
	const [
		onEndReachedCalledDuringMomentum,
		setOnEndReachedCalledDuringMomentum,
	] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refresh();
		setRefreshing(false);
	}, [refresh]);

	useEffect(() => {
		const delay = setTimeout(() => {
			searchEvents(searchText);
		}, 300);

		return () => clearTimeout(delay);
	}, [searchText]);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.background,
				},
			]}
		>
			<CCFHeader
				enableSearch
				showAdd
				searchText={searchText}
				onChangeSearch={setSearchText}
				onAddPress={() => {
					navigation.navigate("DGroupNavigator", {
						screen: "DGroupFormScreen",
					});
				}}
				placeholder="Search Event.."
			/>
			<FlatList
				data={events}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={Separator}
				ListHeaderComponent={<View style={{ height: 16 }} />}
				style={{ paddingHorizontal: 16 }}
				renderItem={({ item }) => (
					<MinistryCard
						name={item.eventTitle}
						series={item.seriesTitle}
						startDate={dayjs().toDate()}
						endDate={dayjs().add(2, "hour").toDate()}
						location={item.location}
						speaker={item.speakers}
					/>
				)}
				refreshControl={Refresh()}
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
				ListFooterComponent={() =>
					activityLoading ? (
						<View style={{ padding: 12 }}>
							<ActivityIndicator size="small" color="#2563EB" />
						</View>
					) : (
						<View style={{ height: 16 }} />
					)
				}
				onMomentumScrollBegin={() => {
					setOnEndReachedCalledDuringMomentum(false);
				}}
			/>
		</View>
	);
};

export default EventScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
});
