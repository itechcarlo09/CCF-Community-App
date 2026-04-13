import { showError } from "src/utils/errorUtils";
import apiClient from "../../../services/apiClient";
import {
	CompaniesItemDTO,
	CompanyDTO,
	CreateCompanyDTO,
	GetCompanyResponse,
} from "../model/Company";
import { GetCompanyParams } from "../model/RequestParams";

export const companyDataSource = {
	// async getMinistriesById(id: string): Promise<MinistryDTO | null> {
	// 	try {
	// 		const res = await apiClient.get<MinistryDTO>(`/event/${id}`);
	// 		return res.data ? res.data : null;
	// 	} catch (error: any) {
	// 		throw new Error(error.message);
	// 	}
	// },
	async getCompanies(
		params?: GetCompanyParams,
	): Promise<GetCompanyResponse | undefined> {
		try {
			const res = await apiClient.get<GetCompanyResponse>("/company", {
				params,
			});
			return res.data ?? undefined;
		} catch (error: any) {
			showError(error);
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
	async addCompany(data: CreateCompanyDTO): Promise<CompanyDTO> {
		const res = await apiClient.post<any>("/company", data);
		return res.data;
	},
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
