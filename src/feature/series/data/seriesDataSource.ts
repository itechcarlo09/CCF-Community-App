import apiClient from "../../../services/apiClient";
import { GetSeriesParams } from "../model/RequestParams";
import { GetSeriesResponse } from "../model/Series";

export const seriesDataSource = {
	// async getMinistriesById(id: string): Promise<MinistryDTO | null> {
	// 	try {
	// 		const res = await apiClient.get<MinistryDTO>(`/event/${id}`);
	// 		return res.data ? res.data : null;
	// 	} catch (error: any) {
	// 		throw new Error(error.message);
	// 	}
	// },
	async getSeries(
		params?: GetSeriesParams,
	): Promise<GetSeriesResponse | undefined> {
		try {
			const res = await apiClient.get<GetSeriesResponse>("/series", {
				params,
			});
			return res.data ?? undefined;
		} catch (error: any) {
			console.error("getSeries error:", error.message ?? error);
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
