import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import UserListItem from "./UserListItem";
import Loading from "../../../components/Loading";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

const Separator = () => <View style={styles.separator} />;

const UserScreen = ({ navigation }: any) => {
	const { users, getUsers, refresh, loading } = useUserViewModel();
	const insets = useSafeAreaInsets();
	// const [refreshing, setRefreshing] = useState(false);
	// const Refresh = () => (
	// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

	// const onRefresh = useCallback(async () => {
	// 	setRefreshing(true);
	// 	refresh();
	// 	setRefreshing(false);
	// }, []);

	// if (loading) return <Loading />;

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<FlatList
				data={users}
				keyExtractor={(item) => String(item.id)}
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
				ListHeaderComponent={<View style={{ height: 16 }} />}
				ListFooterComponent={<View style={{ height: 16 }} />}
				ItemSeparatorComponent={Separator}
				// refreshControl={Refresh()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 14, color: "gray" },
	separator: {
		height: 6,
	},
});

export default UserScreen;
