import { Event } from "../model/Event";
import { eventConverter } from "./eventConverter";

export const eventDataSource = {
	// async get(id: string): Promise<Event | null> {
	// 	try {
	// 		const snap = await eventCollection.doc(id).get();
	// 		return snap.exists() ? eventConverter.fromFirestore(snap) : null;
	// 	} catch (error) {
	// 		console.error("eventDataSource.get error:", error);
	// 		return null;
	// 	}
	// },
	// async getAll(): Promise<Event[]> {
	// 	try {
	// 		const snap = await eventCollection.get();
	// 		return snap.docs.map((doc) => eventConverter.fromFirestore(doc));
	// 	} catch (error) {
	// 		console.error("eventDataSource.getAll error:", error);
	// 		return [];
	// 	}
	// },
	// async add(user: Omit<Event, "id">): Promise<void> {
	// 	try {
	// 		await eventCollection.doc().set(eventConverter.toFirestore(user));
	// 	} catch (error) {
	// 		console.error("eventDataSource.add error:", error);
	// 	}
	// },
	// async update(id: string, data: Partial<Event>): Promise<void> {
	// 	try {
	// 		await eventCollection.doc(id).update({
	// 			...data,
	// 			updatedAt: firestore.Timestamp.now(),
	// 		});
	// 	} catch (error) {
	// 		console.error("eventDataSource.update error:", error);
	// 	}
	// },
	// async delete(id: string): Promise<void> {
	// 	try {
	// 		await eventCollection.doc(id).delete();
	// 	} catch (error) {
	// 		console.error("eventDataSource.delete error:", error);
	// 	}
	// },
};
