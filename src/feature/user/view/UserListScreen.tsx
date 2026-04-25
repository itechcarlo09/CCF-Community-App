import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { RecordItemUI } from "../model/RecordListItem";
import Loading from "@component/Loading";
import CircularImage from "@component/CircularImage";
import Header from "@component/Header";
import { useTheme } from "@theme/ThemeProvider";
import { Separator } from "@component/Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserListScreen = ({ navigation }: any) => {
	const {
		users,
		refresh,
		loading,
		activityLoading,
		searchUsers,
		loadMoreUsers,
	} = useUserViewModel();
	const [searchText, setSearchText] = useState("");
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
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

	const renderItem = ({ item }: { item: RecordItemUI }) => {
		return (
			<TouchableOpacity
				style={[
					styles.card,
					{ borderLeftColor: item.isActive ? "#22C55E" : "#EF4444" },
				]}
				onPress={() => {
					navigation.navigate("UserNavigator", {
						screen: "UserDetailsScreen",
						params: {
							id: item.id,
							hasEditedUser: refresh,
						},
					});
				}}
			>
				<View style={styles.left}>
					<CircularImage
						uri={item?.url}
						size={56}
						fallbackText={item?.fallbackText}
					/>
					{/* Active status dot */}
					{/* {item.isActive && <View style={styles.activeDot} />} */}
				</View>

				<View style={styles.middle}>
					<Text style={styles.name}>{item.fullName}</Text>
					<Text style={styles.details}>{item.age} yrs</Text>

					{/* Membership type badge */}
					<View style={styles.badgeContainer}>
						<Text style={styles.badgeText}>{item.membershipType}</Text>
					</View>
				</View>
				<View style={styles.ministryDetails}>
					{/* Ministry info */}
					<Text style={styles.ministryText}>{item.ministryText}</Text>

					{/* Leader info */}
					{item.dleaderName && (
						<View style={styles.leaderBadge}>
							<Text style={styles.leaderText}>{item.dleaderName}</Text>
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.gray[50],
				paddingTop: insets.top,
			}}
		>
			{/* Header with Search and Add Button */}
			<Header
				onSearch={setSearchText}
				onAdd={() =>
					navigation.navigate("UserNavigator", {
						screen: "UserForm",
						params: {
							onSuccess: onRefresh,
						},
					})
				}
			/>

			{/* User List */}
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={users}
					ItemSeparatorComponent={Separator}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
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
						) : null
					}
					onMomentumScrollBegin={() => {
						setOnEndReachedCalledDuringMomentum(false);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F3F4F6",
		borderRadius: 8,
		paddingHorizontal: 8,
		height: 40,
	},
	addButton: {
		backgroundColor: "#2563EB",
		padding: 10,
		borderRadius: 8,
		marginLeft: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	listContainer: {
		padding: 12,
	},
	right: {
		marginLeft: 12,
	},
	membershipType: {
		fontSize: 14,
		fontWeight: "500",
		color: "#2563EB",
		marginTop: 2,
	},
	header: {
		padding: 12,
		backgroundColor: "#F9FAFB",
	},
	searchCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 44,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	searchInput: {
		flex: 1,
		marginLeft: 8,
		fontSize: 14,
		color: "#111827",
	},
	addButtonFloating: {
		backgroundColor: "#2563EB",
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},
	card: {
		flexDirection: "row",
		alignItems: "flex-start",
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		borderLeftWidth: 4, // colored indicator for active/inactive
	},
	left: {
		marginRight: 12,
		position: "relative",
	},
	activeDot: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: "#22C55E",
		borderWidth: 2,
		borderColor: "#fff",
	},
	middle: {
		flex: 1,
	},
	ministryDetails: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	name: {
		fontSize: 16,
		fontWeight: "700",
		color: "#111827",
	},
	details: {
		fontSize: 14,
		color: "#6B7280",
		marginVertical: 2,
	},
	ministryText: {
		fontSize: 14,
		color: "#374151",
		marginTop: 4,
	},
	badgeContainer: {
		alignSelf: "flex-start",
		backgroundColor: "#2563EB20", // subtle blue background
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 8,
		marginTop: 4,
	},
	badgeText: {
		color: "#2563EB",
		fontSize: 12,
		fontWeight: "600",
	},
	leaderBadge: {
		marginTop: 6,
		backgroundColor: "#FBBF2420",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 8,
	},
	leaderText: {
		color: "#B45309",
		fontSize: 12,
		fontWeight: "600",
	},
});

export default UserListScreen;
