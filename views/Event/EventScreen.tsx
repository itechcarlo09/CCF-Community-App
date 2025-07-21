import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	Alert,
	ActivityIndicator,
	FlatList,
} from "react-native";
import { getApp } from "@react-native-firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
} from "@react-native-firebase/firestore";

type Event = {
	id: string;
	Name: string;
	Date: string;
	// add other fields as needed
};

const EventScreen = ({ navigation }: any) => {
	const app = getApp();
	const db = getFirestore(app);
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const snapshot = await getDocs(collection(db, "Events"));
				const eventList: Event[] = snapshot.docs.map((doc: any) => ({
					id: doc.id,
					...doc.data(),
				})) as Event[];
				setEvents(eventList);
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	console.log("Events:", events);
	console.log("Loading:", loading);

	// const getEvents = async () => {
	// 	const snapshot = await getDocs(collection(db, "Events"));
	// 	snapshot.forEach((doc: any) => {
	// 		console.log(doc.id, doc.data());
	// 	});
	// };

	// getEvents();

	if (loading) {
		return <ActivityIndicator size="large" style={styles.loader} />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Text style={styles.text}>🎉 Welcome to the {item.Name}!</Text>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	text: { fontSize: 18, fontWeight: "bold" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
	card: {
		padding: 16,
		marginVertical: 8,
		backgroundColor: "#f2f2f2",
		borderRadius: 8,
	},
	title: { fontSize: 18, fontWeight: "bold" },
	subtitle: { fontSize: 14, color: "gray" },
});

export default EventScreen;
