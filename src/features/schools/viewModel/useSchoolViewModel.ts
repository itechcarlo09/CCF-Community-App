import { useState, useMemo } from "react";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { CreateSchoolDTO } from "../model/School";
import { schoolRepository } from "../data/schoolRepository";
import { mapSchoolToUI, mapStudentsToUI } from "../data/school.mapper";
import { SCHOOL_PAGE_SIZE } from "src/types/globalTypes";

const STUDENTS_PAGE_SIZE = 20;

interface UseSchoolViewModelProps {
	schoolId?: number;
	enableEnrolled?: boolean;
	enableGraduates?: boolean;
}

const schoolKeys = {
	all: ["schools"] as const,
	lists: (search: string) => ["schools", search] as const,
	detail: (id?: number) => ["school", id] as const,
	students: {
		enrolled: (id?: number, search?: string) =>
			["students", "enrolled", id, search] as const,
		graduates: (id?: number, search?: string) =>
			["students", "graduates", id, search] as const,
	},
};

export const useSchoolViewModel = ({
	schoolId,
	enableEnrolled = false,
	enableGraduates = false,
}: UseSchoolViewModelProps = {}) => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// =========================
	// 🏫 SCHOOLS LIST
	// =========================
	const schoolsQuery = useInfiniteQuery({
		queryKey: schoolKeys.lists(search),

		queryFn: async ({ pageParam = 1 }) => {
			const result = await schoolRepository.getSchools?.({
				...(search.trim() && { search }),
				skip: (pageParam - 1) * SCHOOL_PAGE_SIZE,
				take: SCHOOL_PAGE_SIZE,
			});

			return {
				data: result?.data.map(mapSchoolToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
		initialPageParam: 1,
	});

	// =========================
	// 📄 SCHOOL DETAIL
	// =========================
	const schoolDetailQuery = useQuery({
		queryKey: schoolKeys.detail(schoolId),
		queryFn: () => schoolRepository.getSchoolById?.(schoolId!),
		enabled: !!schoolId,
		staleTime: 1000 * 60 * 5,
	});

	// =========================
	// 🎓 ENROLLED STUDENTS
	// =========================
	const enrolledQuery = useInfiniteQuery({
		queryKey: schoolKeys.students.enrolled(schoolId, search),

		queryFn: async ({ pageParam = 1 }) => {
			const result = await schoolRepository.getStudents?.(
				{
					...(search.trim() && { search }),
					skip: (pageParam - 1) * STUDENTS_PAGE_SIZE,
					take: STUDENTS_PAGE_SIZE,
				},
				true,
				schoolId,
			);

			return {
				data: result?.data.map(mapStudentsToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		enabled: !!schoolId && enableEnrolled, // ✅ no manual toggle needed
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
		initialPageParam: 1,
	});

	// =========================
	// 🎓 GRADUATES
	// =========================
	const graduatesQuery = useInfiniteQuery({
		queryKey: schoolKeys.students.graduates(schoolId, search),

		queryFn: async ({ pageParam = 1 }) => {
			const result = await schoolRepository.getStudents?.(
				{
					...(search.trim() && { search }),
					skip: (pageParam - 1) * STUDENTS_PAGE_SIZE,
					take: STUDENTS_PAGE_SIZE,
				},
				false,
				schoolId,
			);

			return {
				data: result?.data.map(mapStudentsToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		enabled: !!schoolId && enableGraduates, // ✅ no manual toggle needed
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
		initialPageParam: 1,
	});

	// =========================
	// 🧠 MEMOIZED DATA
	// =========================
	const schools = useMemo(
		() => schoolsQuery.data?.pages.flatMap((p) => p.data) ?? [],
		[schoolsQuery.data],
	);

	const enrolled = useMemo(
		() => enrolledQuery.data?.pages.flatMap((p) => p.data) ?? [],
		[enrolledQuery.data],
	);

	const graduates = useMemo(
		() => graduatesQuery.data?.pages.flatMap((p) => p.data) ?? [],
		[graduatesQuery.data],
	);

	// =========================
	// ➕ ADD
	// =========================
	const addSchoolMutation = useMutation({
		mutationFn: schoolRepository.addSchool,

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: schoolKeys.all });
		},
	});

	// =========================
	// ✏️ UPDATE (Optimistic)
	// =========================
	const updateSchoolMutation = useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number;
			data: Partial<CreateSchoolDTO>;
		}) => schoolRepository.updateSchool?.(id, data),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: schoolKeys.all });

			const previous = queryClient.getQueriesData({
				queryKey: schoolKeys.all,
			});

			queryClient.setQueriesData({ queryKey: schoolKeys.all }, (old: any) => {
				if (!old?.pages) return old;

				return {
					...old,
					pages: old.pages.map((page: any) => ({
						...page,
						data: page.data.map((s: any) =>
							s.id === id ? { ...s, ...data } : s,
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
			queryClient.invalidateQueries({ queryKey: schoolKeys.all });
		},
	});

	// =========================
	// 🎯 ACTIONS
	// =========================
	return {
		// data
		schools,
		school: schoolDetailQuery.data ?? null,
		enrolled,
		graduates,

		// loading
		loading: schoolsQuery.isLoading,
		fetching: schoolsQuery.isFetching,
		detailLoading: schoolDetailQuery.isLoading,
		enrolledLoading: enrolledQuery.isLoading,
		graduatesLoading: graduatesQuery.isLoading,

		// actions
		addSchool: addSchoolMutation.mutateAsync,
		updateSchool: (id: number, data: Partial<CreateSchoolDTO>) =>
			updateSchoolMutation.mutateAsync({ id, data }),

		searchSchools: setSearch,

		loadMoreSchools: () =>
			schoolsQuery.hasNextPage && schoolsQuery.fetchNextPage(),
		fetchMoreEnrolled: () =>
			enrolledQuery.hasNextPage && enrolledQuery.fetchNextPage(),
		fetchMoreGraduates: () =>
			graduatesQuery.hasNextPage && graduatesQuery.fetchNextPage(),

		refresh: schoolsQuery.refetch,
	};
};
