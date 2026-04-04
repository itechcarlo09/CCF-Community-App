import { useState, useMemo } from "react";
import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { userRepository } from "../data/userRepository";
import { CreateAccountBasicInfoDTO, UserDTO } from "../model/user";
import { RecordItemUI } from "../model/RecordListItem";
import { mapUserToUI } from "../data/user.mapper";
import { Gender } from "src/types/enums/Gender";

const PAGE_SIZE = 10;

// 🔥 Types
type UsersPage = {
	data: RecordItemUI[];
	hasMore: boolean;
};

type InfiniteUsersData = {
	pages: UsersPage[];
	pageParams: number[];
};

export const useUserViewModel = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	// 🔽 USERS QUERY (Infinite + Search)
	const query = useInfiniteQuery<
		UsersPage, // TQueryFnData
		Error, // TError
		InfiniteData<UsersPage>, // ✅ TData (FIXED)
		["users", string], // TQueryKey
		number // TPageParam
	>({
		queryKey: ["users", search],

		queryFn: async ({ pageParam }): Promise<UsersPage> => {
			const isSearching = !!search.trim();

			const baseParams = {
				page: pageParam,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "lastName",
			};

			const result = isSearching
				? await userRepository.searchUsers({ name: search, ...baseParams })
				: await userRepository.getUsers(baseParams);

			return {
				data: result?.data.map(mapUserToUI) ?? [],
				hasMore: result?.meta?.hasMore ?? false,
			};
		},

		initialPageParam: 1,

		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,

		staleTime: 1000 * 60 * 5,
	});

	// 🔽 Flatten pages
	const users = useMemo<RecordItemUI[]>(() => {
		return query.data?.pages.flatMap((page: UsersPage) => page.data) ?? [];
	}, [query.data]);

	// 🔽 ADD USER
	const addUserMutation = useMutation({
		mutationFn: (user: CreateAccountBasicInfoDTO) => {
			return userRepository.addUser(user);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	// 🔽 UPDATE USER (Optimistic)
	const updateUserMutation = useMutation<
		void,
		Error,
		{ id: number; data: Partial<UserDTO> },
		{ previous?: InfiniteUsersData }
	>({
		mutationFn: ({ id, data }) =>
			userRepository.updateUser(id, {
				...data,
				updatedAt: new Date(),
			}),

		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ["users", search] });

			const previous = queryClient.getQueryData<InfiniteUsersData>([
				"users",
				search,
			]);

			// 🔥 Optimistic update
			queryClient.setQueryData<InfiniteUsersData>(["users", search], (old) => {
				if (!old) return old;

				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						data: page.data.map((u) => (u.id === id ? { ...u, ...data } : u)),
					})),
				};
			});

			return { previous };
		},

		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["users", search], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	// 🔽 GET SINGLE USER
	const getUser = async (id: string): Promise<UserDTO | null> => {
		try {
			return await userRepository.getUserById(id);
		} catch (error) {
			console.error("Error fetching user:", error);
			return null;
		}
	};

	// 🔽 GET DLEADERS
	const getDLeaders = async (
		excludeId: number,
		gender: Gender,
	): Promise<RecordItemUI[]> => {
		try {
			const res = await userRepository.getDLeaders(excludeId, gender);
			return res?.data?.map(mapUserToUI) ?? [];
		} catch (error) {
			console.error("Error fetching DLeaders:", error);
			return [];
		}
	};

	// 🔍 SEARCH
	const searchUsers = (text: string) => {
		setSearch(text);
	};

	// 📄 LOAD MORE
	const loadMoreUsers = () => {
		if (query.hasNextPage) {
			query.fetchNextPage();
		}
	};

	// 🔄 REFRESH
	const refreshUsers = () => {
		query.refetch();
	};

	return {
		users,

		// loading states
		loading: query.isLoading,
		activityLoading: query.isFetching,

		// actions
		addUser: addUserMutation.mutateAsync,
		updateUser: (id: number, data: Partial<UserDTO>) =>
			updateUserMutation.mutateAsync({ id, data }),

		searchUsers,
		getUser,
		getDLeaders,
		refresh: refreshUsers,
		loadMoreUsers,
		hasMore: query.hasNextPage,
	};
};
