import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	Alert,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { getApp } from "@react-native-firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
} from "@react-native-firebase/firestore";

type User = {
	id: string;
	FirstName: string;
	MiddleName: string;
	LastName: string;
};

const UserScreen = ({ navigation }: any) => {
	const app = getApp();
	const db = getFirestore(app);
	const [events, setEvents] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
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

		fetchEvents();
	}, []);

	console.log(events);

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
							🎉 Welcome to Elevate {item.FirstName} {item.MiddleName[0]}.{" "}
							{item.LastName}!
						</Text>
					</TouchableOpacity>
				)}
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
