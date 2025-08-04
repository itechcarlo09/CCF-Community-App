import { useEffect, useState } from "react";
import { userRepository } from "../data/userRepository";
import { User } from "../model/user";
import { ageNow, fromNow } from "../../../utils/dateFormatter";
import { formatFullName } from "../../../utils/stringUtils";

// Optional: UI-specific shape
export interface UserUI {
	id: string;
	fullName: string;
	fallbackText: string; // Used for CircularImage fallback
	ageText: string;
}

const mapUserToUI = (user: User): UserUI => ({
	id: user.id,
	fallbackText: `${user.firstName[0]}${user.lastName[0]}`,
	fullName: formatFullName(user.firstName, user.lastName, user.middleName),
	ageText: ageNow(user.birthdate),
});

export const useUserViewModel = () => {
	const [users, setUsers] = useState<UserUI[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUsers = async () => {
		setLoading(true);
		const result = await userRepository.getAllUsers();
		const mapped = result.map(mapUserToUI);
		setUsers(mapped);
		setLoading(false);
	};

	const addUser = async (
		user: Omit<User, "id" | "createdAt" | "updatedAt">
	) => {
		await userRepository.addUser({
			...user,
			createdAt: new Date(),
		});
		await fetchUsers();
	};

	const getUsers = async (): Promise<any> => {
		console.log("Fetching users...");
		return await userRepository.getUsers();
	};

	const getUser = async (id: string): Promise<User | null> => {
		return await userRepository.getUserById(id);
	};

	const updateUser = async (id: string, data: Partial<User>) => {
		await userRepository.updateUser(id, { ...data, updatedAt: new Date() });
		await fetchUsers();
	};

	const deleteUser = async (id: string) => {
		await userRepository.deleteUser(id);
		await fetchUsers();
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return {
		users,
		loading,
		getUsers,
		refresh: fetchUsers,
		addUser,
		getUser,
		updateUser,
		deleteUser,
	};
};
