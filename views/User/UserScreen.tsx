import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	Alert,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import { getApp } from "@react-native-firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
} from "@react-native-firebase/firestore";
import { User } from "../../firebase/firestore/types/User";

const UserScreen = ({ navigation }: any) => {
	const app = getApp();
	const db = getFirestore(app);
	const [events, setEvents] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchUsers = async () => {
		try {
			const snapshot = await getDocs(collection(db, "Users"));
			const userList: User[] = snapshot.docs.map((doc: any) => ({
				id: doc.id,
				...doc.data(),
			})) as User[];
			setEvents(userList);
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
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.card}
						onPress={() => console.log(item.id)}
					>
						<Text style={styles.text}>
							🎉 Welcome to Elevate {item.firstName}{" "}
							{item.middleName ? item.middleName[0] + ". " : ""}
							{item.lastName}!
						</Text>
					</TouchableOpacity>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold", color: "#fff" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	card: {
		elevation: 6,
		padding: 16,
		marginVertical: 8,
		backgroundColor: "#c00b0bff",
		borderRadius: 8,
	},
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 14, color: "gray" },
});

export default UserScreen;
