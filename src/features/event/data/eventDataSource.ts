import apiClient from "../../../services/apiClient";
import { GetEventResponse } from "../model/Event";
import { GetEventsParams } from "../model/RequestParams";

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
	async getEvents(
		params?: GetEventsParams,
	): Promise<GetEventResponse | undefined> {
		try {
			const res = await apiClient.get<GetEventResponse>("/event", {
				params,
			});
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("getEvents error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return undefined;
		}
	},

	async searchEvents(
		params?: GetEventsParams,
	): Promise<GetEventResponse | undefined> {
		try {
			const res = await apiClient.get<GetEventResponse>(`/event/search`, {
				params,
			});
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("searchEvents error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return undefined;
		}
	},
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
