import { useEffect, useState } from "react";
import { userRepository } from "../data/userRepository";
import { User } from "../model/user";
import { ageNow, ageNumber } from "../../../utils/dateFormatter";
import { formatFullName } from "../../../utils/stringUtils";
import { UserUI } from "../model/UserUI";
import { RecordItemUI } from "../model/RecordListItem";

const mapUserToUI = (user: User): RecordItemUI => ({
	id: user.id,
	fallbackText: `${user.firstName[0]}${user.lastName[0]}`,
	fullName: formatFullName(user.firstName, user.lastName, user.middleName),
	age: ageNumber(user.birthDate),
	ministryText:
		ageNumber(user.birthDate) < 22
			? "Elevate Youth Ministry"
			: "B1G Singles Ministry",
	status: "Active Member",
});

export const useUserViewModel = () => {
	const [users, setUsers] = useState<RecordItemUI[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUsers = async () => {
		setLoading(true);
		const result = await userRepository.getUsers();
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
