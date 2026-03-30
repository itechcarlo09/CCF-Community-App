import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import MdiIcon from "@components/MdiIcon";
import {
	mdiCheckCircleOutline,
	mdiCloseCircleOutline,
	mdiPlus,
	mdiMagnify,
} from "@mdi/js";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { RecordItemUI } from "../model/RecordListItem";
import Loading from "@components/Loading";
import CircularImage from "@components/CircularImage";

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
				style={styles.card}
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
						size={48}
						fallbackText={item?.fallbackText}
					/>
				</View>
				<View style={styles.middle}>
					<Text style={styles.name}>{item.fullName}</Text>
					<Text style={styles.details}>
						{item.age} yrs • {item.ministryText}
					</Text>
					<Text style={styles.membershipType}>{item.membershipType}</Text>
					{item.dleaderName && (
						<Text style={styles.details}>Leader: {item.dleaderName}</Text>
					)}
				</View>
				<View style={styles.right}>
					<MdiIcon
						path={item.isActive ? mdiCheckCircleOutline : mdiCloseCircleOutline}
						size={24}
						color={item.isActive ? "#22C55E" : "#EF4444"}
					/>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			{/* Header with Search and Add Button */}
			<View style={styles.header}>
				<View style={styles.searchContainer}>
					<MdiIcon path={mdiMagnify} size={20} color="#6B7280" />
					<TextInput
						style={styles.searchInput}
						value={searchText}
						onChangeText={setSearchText}
						placeholder={"Search record..."}
						placeholderTextColor="#9CA3AF"
					/>
				</View>
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
					<MdiIcon path={mdiPlus} size={24} color="#fff" />
				</TouchableOpacity>
			</View>

			{/* User List */}
			{loading ? (
				<Loading />
			) : (
				<FlatList
					data={users}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					refreshControl={Refresh()}
					contentContainerStyle={styles.listContainer}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#fff",
	},
	searchContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F3F4F6",
		borderRadius: 8,
		paddingHorizontal: 8,
		height: 40,
	},
	searchInput: {
		flex: 1,
		marginLeft: 8,
		fontSize: 14,
		color: "#111827",
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
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F9FAFB",
		borderRadius: 8,
		padding: 12,
	},
	left: {
		marginRight: 12,
	},
	middle: {
		flex: 1,
	},
	right: {
		marginLeft: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	details: {
		fontSize: 14,
		color: "#6B7280",
	},
	membershipType: {
		fontSize: 14,
		fontWeight: "500",
		color: "#2563EB",
		marginTop: 2,
	},
	separator: {
		height: 8,
	},
});

export default UserListScreen;
