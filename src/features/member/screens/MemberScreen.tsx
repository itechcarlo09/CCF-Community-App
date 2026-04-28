import { design } from "@theme/index";
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
import CCFTextInput from "@components/CCFTextInput";
import MDIIcon from "@components/MDIIcon";
import { mdiPlus } from "@mdi/js";
import Loading from "@component/Loading";
import { useUserViewModel } from "@features/member/viewModel/useUserViewModel";
import { Separator } from "@component/Separator";
import MemberItem from "../components/MemberItem";
import { AppStackParamList, UserStackParamList } from "src/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type UserRouteProp = RouteProp<AppStackParamList, "UserNavigator">;
type NavProp = NativeStackNavigationProp<AppStackParamList>;

const MemberScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const {
		users,
		refresh,
		loading,
		activityLoading,
		searchUsers,
		loadMoreUsers,
	} = useUserViewModel();
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
			searchUsers(searchText);
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
			<View
				style={[
					styles.headerContainer,
					{
						paddingTop: insets.top,
						backgroundColor: theme.background,
						borderBottomColor: theme.muted,
						borderBottomWidth: 0.3,
						paddingBottom: design.spacing.md,
						paddingHorizontal: design.spacing.lg,
						columnGap: design.spacing.md,
					},
				]}
			>
				<CCFTextInput
					placeholder="Search Record"
					isSearch
					onChangeText={setSearchText}
					containerStyle={{ flex: 1 }}
				/>
				<MDIIcon
					path={mdiPlus}
					size={22}
					color={theme.white}
					onPress={() => {
						navigation.navigate("UserNavigator", {
							screen: "UserForm",
							params: {
								onSuccess: onRefresh,
							},
						});
					}}
				/>
			</View>
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={users}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={Separator}
					ListHeaderComponent={<View style={{ height: 16 }} />}
					style={{ paddingHorizontal: 16 }}
					renderItem={(item) => (
						<MemberItem
							id={item.item.id}
							name={item.item.completeName}
							gender={"gender"}
							dgroup={null}
							role={"ss"}
							status={"Inactive"}
							lastAttendance={null}
							avatar={null}
							onPress={() => {
								navigation.navigate("UserNavigator", {
									screen: "UserDetailsScreen",
									params: {
										id: item.item.id,
										hasEditedUser: refresh,
									},
								});
							}}
						/>
					)}
					refreshControl={Refresh()}
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
			)}
		</View>
	);
};

export default MemberScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
});
