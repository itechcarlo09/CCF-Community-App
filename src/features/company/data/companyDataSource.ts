import { handleApiError, showError } from "src/utils/errorUtils";
import apiClient from "../../../services/apiClient";
import {
	CompanyDTO,
	CreateCompanyDTO,
	GetCompanyResponse,
	GetEmployeesResponse,
	UpdateCompanyDTO,
} from "../model/Company";
import { GetCompanyParams } from "../model/RequestParams";
import { PAGE_SIZE } from "src/types/globalTypes";

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
	async getCompanyById(id: number): Promise<CompanyDTO | undefined> {
		try {
			const res = await apiClient.get<CompanyDTO>(`/company/${id}`);
			return res.data ? res.data : undefined;
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
	async updateCompany(id: number, data: UpdateCompanyDTO): Promise<CompanyDTO> {
		const res = await apiClient.put(`/company/${id}`, data);
		return res.data;
	},

	async getEmployees(
		params?: GetCompanyParams,
		isEmployed: boolean = true,
		companyId: number = 0,
	): Promise<GetEmployeesResponse> {
		try {
			const res = await apiClient.get<GetEmployeesResponse>(
				`/company${isEmployed ? "/employed" : "/former"}/${companyId}`,
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
			showError(error);
			return {
				data: [],
				meta: {
					page: 0,
					limit: PAGE_SIZE,
					hasMore: false,
				},
			};
		}
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
