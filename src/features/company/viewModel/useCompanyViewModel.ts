import { useState, useMemo } from "react";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { CreateCompanyDTO } from "../model/Company";
import { companyRepository } from "../data/companyRepository";
import { mapCompanyToUI, mapEmployeesToUI } from "../data/company.mapper";
import { COMPANY_PAGE_SIZE } from "src/types/globalTypes";

const EMPLOYEES_PAGE_SIZE = 20;

interface UseCompanyViewModelProps {
	companyId?: number;
	enableActiveEmployees?: boolean;
	enableInactiveEmployees?: boolean;
}

const companyKeys = {
	all: ["companies"] as const,
	lists: (search: string) => ["companies", search] as const,
	detail: (id?: number) => ["company", id] as const,
	employees: {
		active: (id?: number, search?: string) =>
			["employees", "active", id, search] as const,
		inactive: (id?: number, search?: string) =>
			["employees", "inactive", id, search] as const,
	},
};

export const useCompanyViewModel = ({
	companyId,
	enableActiveEmployees = false,
	enableInactiveEmployees = false,
}: UseCompanyViewModelProps = {}) => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// =========================
	// 🏢 COMPANIES LIST
	// =========================
	const companiesQuery = useInfiniteQuery({
		queryKey: companyKeys.lists(search),

		queryFn: async ({ pageParam = 1 }) => {
			const result = await companyRepository.getCompanies?.({
				...(search.trim() && { search }),
				skip: (pageParam - 1) * COMPANY_PAGE_SIZE,
				take: COMPANY_PAGE_SIZE,
			});

			return {
				data: result?.data.map(mapCompanyToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
		initialPageParam: 1,
	});

	// =========================
	// 📄 COMPANY DETAIL
	// =========================
	const companyDetailQuery = useQuery({
		queryKey: companyKeys.detail(companyId),
		queryFn: () => companyRepository.getCompanyById?.(companyId!),
		enabled: !!companyId,
		staleTime: 1000 * 60 * 5,
	});

	// =========================
	// 👥 ACTIVE EMPLOYEES
	// =========================
	const activeEmployeesQuery = useInfiniteQuery({
		queryKey: companyKeys.employees.active(companyId, search),

		queryFn: async ({ pageParam = 1 }) => {
			const result = await companyRepository.getEmployees?.(
				{
					...(search.trim() && { search }),
					skip: (pageParam - 1) * EMPLOYEES_PAGE_SIZE,
					take: EMPLOYEES_PAGE_SIZE,
				},
				true, // active
				companyId,
			);

			return {
				data: result?.data.map(mapEmployeesToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		enabled: !!companyId && enableActiveEmployees,
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
		initialPageParam: 1,
	});

	// =========================
	// 👥 INACTIVE EMPLOYEES
	// =========================
	const inactiveEmployeesQuery = useInfiniteQuery({
		queryKey: companyKeys.employees.inactive(companyId, search),

		queryFn: async ({ pageParam = 1 }) => {
			const result = await companyRepository.getEmployees?.(
				{
					...(search.trim() && { search }),
					skip: (pageParam - 1) * EMPLOYEES_PAGE_SIZE,
					take: EMPLOYEES_PAGE_SIZE,
				},
				false, // inactive
				companyId,
			);

			return {
				data: result?.data.map(mapEmployeesToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		enabled: !!companyId && enableInactiveEmployees,
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
		initialPageParam: 1,
	});

	// =========================
	// 🧠 MEMOIZED DATA
	// =========================
	const companies = useMemo(
		() => companiesQuery.data?.pages.flatMap((p) => p.data) ?? [],
		[companiesQuery.data],
	);

	const activeEmployees = useMemo(
		() => activeEmployeesQuery.data?.pages.flatMap((p) => p.data) ?? [],
		[activeEmployeesQuery.data],
	);

	const inactiveEmployees = useMemo(
		() => inactiveEmployeesQuery.data?.pages.flatMap((p) => p.data) ?? [],
		[inactiveEmployeesQuery.data],
	);

	// =========================
	// ➕ ADD COMPANY
	// =========================
	const addCompanyMutation = useMutation({
		mutationFn: companyRepository.addCompany,

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: companyKeys.all });
		},
	});

	// =========================
	// ✏️ UPDATE COMPANY (Optimistic)
	// =========================
	const updateCompanyMutation = useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: Partial<CreateCompanyDTO>;
		}) => companyRepository.updateCompany?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: companyKeys.all });

			const previous = queryClient.getQueriesData({
				queryKey: companyKeys.all,
			});

			queryClient.setQueriesData({ queryKey: companyKeys.all }, (old: any) => {
				if (!old?.pages) return old;

				return {
					...old,
					pages: old.pages.map((page: any) => ({
						...page,
						data: page.data.map((c: any) =>
							c.id === id ? { ...c, ...data } : c,
						),
					})),
				};
			});

			return { previous };
		},

		onError: (_err, _vars, context) => {
			context?.previous?.forEach(([key, data]) => {
				queryClient.setQueryData(key, data);
			});
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: companyKeys.all });
		},
	});

	// =========================
	// 🎯 ACTIONS
	// =========================
	return {
		// data
		companies,
		company: companyDetailQuery.data ?? null,
		activeEmployees,
		inactiveEmployees,

		// loading
		loading: companiesQuery.isLoading,
		fetching: companiesQuery.isFetching,
		detailLoading: companyDetailQuery.isLoading,
		activeLoading: activeEmployeesQuery.isLoading,
		inactiveLoading: inactiveEmployeesQuery.isLoading,

		// actions
		addCompany: addCompanyMutation.mutateAsync,
		updateCompany: (id: number, data: Partial<CreateCompanyDTO>) =>
			updateCompanyMutation.mutateAsync({ id, data }),

		searchCompanies: setSearch,

		loadMoreCompanies: () =>
			companiesQuery.hasNextPage && companiesQuery.fetchNextPage(),
		fetchMoreActiveEmployees: () =>
			activeEmployeesQuery.hasNextPage && activeEmployeesQuery.fetchNextPage(),
		fetchMoreInactiveEmployees: () =>
			inactiveEmployeesQuery.hasNextPage &&
			inactiveEmployeesQuery.fetchNextPage(),

		refresh: companiesQuery.refetch,
	};
};
