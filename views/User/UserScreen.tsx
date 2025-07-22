import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	RefreshControl,
} from "react-native";
import { getApp } from "@react-native-firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
} from "@react-native-firebase/firestore";
import { User } from "../../firebase/firestore/types/User";
import UserListItem from "./components/UserListItem";
import { getAllUsers } from "../../firebase/firestore/userService";

const Separator = () => <View style={styles.separator} />;

const UserScreen = ({ navigation }: any) => {
	const app = getApp();
	const db = getFirestore(app);
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const Refresh = () => (
		<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
	);

	const fetchUsers = async () => {
		try {
			const userList = await getAllUsers();
			setUsers(userList);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchUsers();
		setRefreshing(false);
	}, []);

	useEffect(() => {
		fetchUsers();
	}, []);

	if (loading) {
		return <ActivityIndicator size="large" style={styles.loader} />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={users}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<UserListItem
						user={item}
						onPress={(id) =>
							navigation.navigate("UserNavigation", {
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
