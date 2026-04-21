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
import { useSchoolViewModel } from "../viewModel/useSchoolViewModel";
import SchoolCard from "./components/SchoolListItem";
import useDebounce from "src/feature/user/hooks/useDebounce";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserStackParamList, OtherStackParamList } from "src/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SchoolItemUI } from "../model/SchoolListItem";

type SchoolRouteProp = RouteProp<
	OtherStackParamList | UserStackParamList,
	"SchoolListScreen"
>;
type NavProp = NativeStackNavigationProp<
	OtherStackParamList | UserStackParamList
>;
type OtherStackNavProp = NativeStackNavigationProp<OtherStackParamList>;

export const SchoolListScreen = () => {
	const navigation = useNavigation<NavProp>();
	const otherNavigation = useNavigation<OtherStackNavProp>();
	const route = useRoute<SchoolRouteProp>();
	const { onSelect } = route.params || {};

	const {
		schools,
		refresh,
		loading,
		fetching,
		loadMoreSchools,
		searchSchools,
	} = useSchoolViewModel();
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
	useEffect(() => {
		searchSchools(debouncedSearchTerm);
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

	const goToSchoolForm = (id?: number) => {
		navigation.navigate("SchoolFormScreen", id ? { id } : undefined);
	};

	const handleSelect = (item: SchoolItemUI) => {
		if (onSelect) {
			onSelect(
				item.id,
				`${item.name} ${item.acronym ? `- ${item.acronym}` : ""}`,
			);
			navigation.goBack();
		} else {
			otherNavigation.navigate("SchoolDetailsScreen", {
				id: item.id,
				enrolledCount: item.currentCount,
				graduatesCount: item.alumniCount,
			});
		}
	};

	return (
		<View style={[styles.container, { backgroundColor: theme.gray[50] }]}>
			<Header
				title={`${onSelect ? "Select School" : "Manage Schools"}`}
				placeholder="Search school..."
				onSearch={setSearch}
				onBack={navigation.goBack}
				onAdd={() => goToSchoolForm()}
			/>

			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={schools}
					ItemSeparatorComponent={Separator}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<SchoolCard
							item={item}
							onPress={handleSelect}
							isCountsShown={!onSelect}
						/>
					)}
					ListHeaderComponent={<View style={{ height: 6 }} />}
					ListFooterComponent={
						fetching ? (
							<ActivityIndicator style={{ marginVertical: 16 }} size="large" />
						) : (
							<View style={{ height: 16 }} />
						)
					}
					onEndReached={() => {
						if (!onEndReachedCalledDuringMomentum && !fetching && !loading) {
							loadMoreSchools();
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
