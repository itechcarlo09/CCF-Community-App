import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import UserListItem from "./UserListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MdiIcon from "../../../components/MdiIcon";
import { mdiPlusBoxOutline } from "@mdi/js";
import { useTheme } from "../../../theme/ThemeProvider";
import { SearchField } from "../../../components/SearchField";
import useDebounce from "../hooks/useDebounce";
import UserLoader from "./components/UserSkeleton";
import UserType from "../../../types/enums/UserType";

const Separator = () => <View style={styles.separator} />;

const UserScreen = ({ navigation }: any) => {
	const {
		users,
		refresh,
		loading,
		activityLoading,
		searchUsers,
		loadMoreUsers,
	} = useUserViewModel();
	const [
		onEndReachedCalledDuringMomentum,
		setOnEndReachedCalledDuringMomentum,
	] = useState(false);
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);
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
		searchUsers(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

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
						navigation.navigate("UserNavigator", {
							screen: "UserForm",
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
				<UserLoader />
			) : (
				<FlatList
					data={users}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<UserListItem
							user={item}
							onPress={(id) => {
								navigation.navigate("UserNavigator", {
									screen: "UserDetailsScreen",
									params: {
										id,
										hasEditedUser: refresh,
									},
								});
							}}
						/>
					)}
					refreshControl={Refresh()}
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
							loadMoreUsers();
							setOnEndReachedCalledDuringMomentum(true);
						}
					}}
					onEndReachedThreshold={0.1}
					ItemSeparatorComponent={Separator}
					onMomentumScrollBegin={() => {
						setOnEndReachedCalledDuringMomentum(false);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	sortText: {
		fontWeight: "600",
		fontSize: 12,
		lineHeight: 16,
		marginRight: 8,
		textAlign: "center",
		width: 76,
	},
	dropdown: {
		minHeight: 40,
		borderRadius: 6,
		borderStartStartRadius: 0,
		borderStartEndRadius: 0,
	},
	addButton: {
		height: 42,
		width: 42,
		justifyContent: "center",
		marginLeft: 10,
	},
	separator: {
		height: 6,
	},
});
export default UserScreen;
