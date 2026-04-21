import apiClient from "../../../services/apiClient";
import { GetMinistryResponse } from "../model/Ministry";
import { GetMinistryParams } from "../model/RequestParams";

export const ministryDataSource = {
	// async getMinistriesById(id: string): Promise<MinistryDTO | null> {
	// 	try {
	// 		const res = await apiClient.get<MinistryDTO>(`/event/${id}`);
	// 		return res.data ? res.data : null;
	// 	} catch (error: any) {
	// 		throw new Error(error.message);
	// 	}
	// },
	async getMinistries(
		params?: GetMinistryParams,
	): Promise<GetMinistryResponse | undefined> {
		try {
			const res = await apiClient.get<GetMinistryResponse>("/ministry/main", {
				params,
			});
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("getMinistries error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return undefined;
		}
	},

	// async searchEvents(
	// 	params?: GetMinistryParams,
	// ): Promise<GetMinistryResponse | undefined> {
	// 	try {
	// 		const res = await apiClient.get<GetMinistryResponse>(`/event/search`, {
	// 			params,
	// 		});
	// 		return res.data ?? undefined;
	// 	} catch (error: any) {
	// 		console.error("searchtMinistries error:", error.message ?? error);
	// 		// Optional: You can throw a custom error or handle it gracefully
	// 		return undefined;
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
