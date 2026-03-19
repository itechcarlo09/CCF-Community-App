import { useEffect, useState } from "react";
import { userRepository } from "../data/userRepository";
import { UserDTO } from "../model/user";
import { RecordItemUI } from "../model/RecordListItem";
import Gender from "../../../types/enums/Gender";
import { mapUserToUI } from "../data/user.mapper";

const PAGE_SIZE = 10;

export const useUserViewModel = () => {
	const [users, setUsers] = useState<RecordItemUI[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [activityLoading, setActivityLoading] = useState(false);

	const fetchUsers = async (nextPage = page) => {
		if (loading || activityLoading || !hasMore) return;

		try {
			if (nextPage === 1) {
				setLoading(true); // initial / refresh
			} else {
				setActivityLoading(true); // pagination
			}

			const result = await userRepository.getUsers({
				page: nextPage,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "lastName",
			});

			if (!result) return;

			const mappedUsers = result.data.map(mapUserToUI);

			setUsers((prev) =>
				nextPage === 1 ? mappedUsers : [...prev, ...mappedUsers],
			);

			setPage(nextPage);
			setHasMore(result.meta.hasMore);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
			setActivityLoading(false);
		}
	};

	const addUser = async (
		user: Omit<UserDTO, "id" | "createdAt" | "updatedAt">,
	) => {
		try {
			setLoading(true);
			await userRepository.addUser({
				...user,
			});
		} catch (error) {
			console.error("Error adding user:", error);
		} finally {
			setLoading(false);
		}
	};

	const getUser = async (id: string): Promise<UserDTO | null> => {
		try {
			setLoading(true);
			return await userRepository.getUserById(id);
		} catch (error) {
			console.error("Error fetching user:", error);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const getDLeaders = async (
		excludeId: number,
		gender: Gender,
	): Promise<RecordItemUI[]> => {
		try {
			setLoading(true);
			const dleaders = await userRepository.getDLeaders(excludeId, gender);
			return dleaders && dleaders.data ? dleaders.data.map(mapUserToUI) : [];
		} catch (error) {
			console.error("Error fetching DLeaders:", error);
			return [];
		} finally {
			setLoading(false);
		}
	};

	const searchUsers = async (searchText: string) => {
		try {
			setLoading(true);

			if (searchText.trim() === "") {
				setPage(1);
				setHasMore(true);
				await fetchUsers(1);
				return;
			}

			const result = await userRepository.searchUsers(searchText);
			const mappedUsers = result?.data.map(mapUserToUI);

			setUsers(mappedUsers ?? []);
			setHasMore(false); // disable pagination during search
		} catch (error) {
			console.error("Error searching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateUser = async (id: string, data: Partial<UserDTO>) => {
		try {
			setLoading(true);
			await userRepository.updateUser(id, { ...data, updatedAt: new Date() });
		} catch (error) {
			console.error("Error updating user:", error);
		} finally {
			setLoading(false);
		}
	};

	const loadMoreUsers = () => {
		if (loading || activityLoading || !hasMore || users.length < PAGE_SIZE)
			return;

		fetchUsers(page + 1);
	};

	useEffect(() => {
		console.log("initial load");
		fetchUsers(1);
	}, []);

	// const deleteUser = async (id: string) => {
	// 	await userRepository.deleteUser(id);
	// 	await fetchUsers();
	// };

	const refreshUsers = () => {
		setHasMore(true);
		fetchUsers(1);
	};

	return {
		users,
		loading,
		activityLoading,
		addUser,
		updateUser,
		searchUsers,
		getUser,
		getDLeaders,
		refresh: refreshUsers,
		fetchUsers,
		loadMoreUsers,
	};
};
