import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { CompanyItemUI } from "../model/CompanyListUI";
import { CompanyDTO } from "../model/Company";
import { companyRepository } from "../data/companyRepository";
import { mapCompanyToUI } from "../data/company.mapper";

const PAGE_SIZE = 10;

// 🔥 Types
type CompaniesPage = {
	data: CompanyItemUI[];
	hasMore: boolean;
};

type InfiniteCompaniesData = {
	pages: CompaniesPage[];
	pageParams: number[];
};

export const useCompanyViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		CompaniesPage,
		Error,
		InfiniteData<CompaniesPage>,
		["companies", string],
		number
	>({
		queryKey: ["companies", search],

		queryFn: async ({ pageParam }): Promise<CompaniesPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "name",
			};

			const result = isSearching
				? await companyRepository.searchSchools?.({
						name: search,
						...baseParams,
				  })
				: await companyRepository.getCompanies(baseParams);

			return {
				data: result?.data.map(mapCompanyToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten
	const companies = useMemo<CompanyItemUI[]>(() => {
		return query.data?.pages.flatMap((page) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD
	const addCompanyMutation = useMutation({
		mutationFn: (data: Omit<CompanyDTO, "id">) =>
			companyRepository.addSchool?.(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["schools"] });
		},
	});

	// 🔽 UPDATE (Optimistic)
	const updateCompanyMutation = useMutation<
		void,
		Error,
		{ id: string; data: Partial<CompanyDTO> },
		{ previous?: InfiniteCompaniesData }
	>({
		mutationFn: ({ id, data }) => companyRepository.updateSchool?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ["company", search] });

			const previous = queryClient.getQueryData<InfiniteCompaniesData>([
				"company",
				search,
			]);

			queryClient.setQueryData<InfiniteCompaniesData>(
				["company", search],
				(old) => {
					if (!old) return old;

					return {
						...old,
						pages: old.pages.map((page) => ({
							...page,
							data: page.data.map((s) =>
								s.id.toString() === id ? { ...s, ...data } : s,
							),
						})),
					};
				},
			);

			return { previous };
		},

		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["company", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["company"] });
		},
	});

	// 🔽 GET SINGLE
	const getCompany = async (id: string): Promise<CompanyDTO | null> => {
		try {
			return await companyRepository.getSchoolById?.(id);
		} catch (error) {
			console.error("Error fetching school:", error);
			return null;
		}
	};

	// 🔍 SEARCH
	const searchCompanies = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreCompanies = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshCompanies = () => {
		query.refetch();
	};

	return {
		companies,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addCompany: addCompanyMutation.mutateAsync,
		updateCompany: (id: string, data: Partial<CompanyDTO>) =>
			updateCompanyMutation.mutateAsync({ id, data }),

		searchCompanies,
		getCompany,
		refresh: refreshCompanies,
		loadMoreCompanies,
		hasMore: query.hasNextPage,
	};
};
