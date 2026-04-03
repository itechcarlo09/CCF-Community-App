import { handleApiError } from "src/utils/errorUtils";
import apiClient from "../../../services/apiClient";
import { GetSchoolParams } from "../model/RequestParams";
import {
	CreateSchoolDTO,
	GetSchoolResponse,
	GetStudentsResponse,
	SchoolDTO,
} from "../model/School";
import { PAGE_SIZE } from "src/types/globalTypes";

export const schoolDataSource = {
	async getSchools(params?: GetSchoolParams): Promise<GetSchoolResponse> {
		try {
			const res = await apiClient.get<GetSchoolResponse>("/school", {
				params,
			});

			return {
				data: res.data?.data ?? [], // always array
				meta: res.data?.meta ?? {
					page: 0,
					limit: PAGE_SIZE,
					hasMore: false,
				},
			};
		} catch (error: any) {
			handleApiError(error);

			return {
				data: [], // fallback safe value
				meta: {
					page: 0,
					limit: PAGE_SIZE,
					hasMore: false,
				},
			};
		}
	},
	async getSchoolById(id: number): Promise<SchoolDTO | null> {
		try {
			const res = await apiClient.get<SchoolDTO>(`/school/${id}`);
			return res.data ? res.data : null;
		} catch (error: any) {
			handleApiError(error);
			throw new Error(error.message);
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
	async addSchool(data: CreateSchoolDTO): Promise<SchoolDTO | null> {
		try {
			const res = await apiClient.post<any>("/school", data);
			return res.data ?? null;
		} catch (error: any) {
			throw new Error(error.message);
		}
	},
	async updateSchool(id: number, data: Partial<SchoolDTO>): Promise<void> {
		try {
			await apiClient.put(`/school/${id}`, data);
		} catch (error: any) {
			throw new Error(error.message);
		}
	},

	async getStudents(
		params?: GetSchoolParams,
		isEnrolled: boolean = true,
		schoolId: number = 0,
	): Promise<GetStudentsResponse> {
		try {
			const res = await apiClient.get<GetStudentsResponse>(
				`/school${isEnrolled ? "/enrolled" : "/graduates"}/${schoolId}`,
				{
					params,
				},
			);

			return {
				data: res.data?.data ?? [], // always array
				meta: res.data?.meta ?? {
					page: 0,
					limit: PAGE_SIZE,
					hasMore: false,
				},
			};
		} catch (error: any) {
			handleApiError(error);

			return {
				data: [], // fallback safe value
				meta: {
					page: 0,
					limit: PAGE_SIZE,
					hasMore: false,
				},
			};
		}
	},
	// async delete(id: string): Promise<void> {
	// 	try {
	// 		await eventCollection.doc(id).delete();
	// 	} catch (error) {
	// 		console.error("eventDataSource.delete error:", error);
	// 	}
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
