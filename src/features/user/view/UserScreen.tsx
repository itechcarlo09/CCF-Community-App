import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import UserListItem from "./UserListItem";
import Loading from "../../../components/Loading";

const Separator = () => <View style={styles.separator} />;

const UserScreen = ({ navigation }: any) => {
	const { users, refresh, loading } = useUserViewModel();
	const [refreshing, setRefreshing] = useState(false);
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		refresh();
		setRefreshing(false);
	}, []);

	if (loading) return <Loading />;

	return (
		<View style={styles.container}>
			<FlatList
				data={users}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<UserListItem
						user={item}
						onPress={(id) =>
							navigation.navigate("UserNavigator", {
								screen: "UserForm",
								params: { id: id },
							})
						}
					/>
				)}
				ItemSeparatorComponent={Separator}
				refreshControl={Refresh()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#952828ff",
	},
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 14, color: "gray" },
	separator: {
		height: 1,
		marginHorizontal: 16,
	},
});

export default UserScreen;
