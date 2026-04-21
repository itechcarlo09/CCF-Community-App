import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	RefreshControl,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import Header from "@component/Header";
import Loading from "@component/Loading";
import { useTheme } from "@theme/ThemeProvider";
import useDebounce from "src/feature/user/hooks/useDebounce";
import { useSpeakerViewModel } from "../viewModel/useSpeakerViewModel";
import SpeakerCard from "./components/SpeakerListItem";

const numColumns = 2;
const { width } = Dimensions.get("window");
const tileSize = width / numColumns - 24; // padding adjustment

export const SpeakerListScreen = ({ navigation }: any) => {
	const {
		speakers,
		refresh,
		loading,
		activityLoading,
		loadMoreSpeakers,
		searchSpeakers,
	} = useSpeakerViewModel();

	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);

	useEffect(() => {
		searchSpeakers(debouncedSearchTerm);
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
				title="Speakers"
				placeholder="Search speakers..."
				onSearch={setSearch}
				onBack={() => navigation.goBack()}
				onAdd={() => navigation.navigate("CreateSpeakerScreen")}
			/>

			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={speakers}
					keyExtractor={(item) => item.id}
					numColumns={numColumns}
					columnWrapperStyle={{
						justifyContent: "space-between",
						marginBottom: 12,
					}}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item }) => (
						<SpeakerCard item={item} style={{ width: tileSize }} />
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
							loadMoreSpeakers();
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
	container: { flex: 1, paddingHorizontal: 12 },
});
