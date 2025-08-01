import firestore from "@react-native-firebase/firestore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Event } from "../model/Event";

export const eventConverter = {
	toFirestore(event: Omit<Event, "id">) {
		const firestoreUser: any = {
			...event,
			date: event.date ? firestore.Timestamp.fromDate(event.date) : null,
			createdAt: event.createdAt
				? firestore.Timestamp.fromDate(event.createdAt)
				: firestore.Timestamp.now(),
		};

		if (event.updatedAt) {
			firestoreUser.updatedAt = firestore.Timestamp.fromDate(event.updatedAt);
		}

		return firestoreUser;
	},
	fromFirestore(snapshot: FirebaseFirestoreTypes.DocumentSnapshot): Event {
		const data = snapshot.data();
		return {
			id: snapshot.id,
			...data,
			createdAt: data?.createdAt?.toDate?.(),
			updatedAt: data?.updatedAt?.toDate?.(),
		} as Event;
	},
};
