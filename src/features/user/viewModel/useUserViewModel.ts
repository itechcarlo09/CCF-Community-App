import { useEffect, useState } from "react";
import { userRepository } from "../data/userRepository";
import { User } from "../model/user";
import { ageNumber } from "../../../utils/dateFormatter";
import { formatFullName } from "../../../utils/stringUtils";
import { RecordItemUI } from "../model/RecordListItem";
import { DropdownOption } from "../../../types/dropdownOption";

const mapUserToUI = (user: User): RecordItemUI => ({
	id: user.id,
	fallbackText: `${user.firstName[0]}${user.lastName[0]}`,
	fullName: formatFullName(user.firstName, user.lastName, user.middleName),
	age: ageNumber(user.birthDate),
	ministryText:
		ageNumber(user.birthDate) < 22 ? "ELEVATE Youth" : "B1G Singles",
	status: "Active Member",
	dleaderName: user.dGroupLeader
		? formatFullName(
				user.dGroupLeader.firstName,
				user.dGroupLeader.lastName,
				user.dGroupLeader.middleName
		  )
		: null,
	membershipType:
		user.dGroupMembers > 2
			? "DLeader"
			: user.dGroupMembers > 0
			? "Timothy"
			: user.dGroupLeader
			? "DMember"
			: "Pending Member",
});

const mapUserToDLeadersList = (user: User): DropdownOption => ({
	label: formatFullName(user.firstName, user.lastName, user.middleName),
	value: String(user.id),
});

export const useUserViewModel = () => {
	const [users, setUsers] = useState<RecordItemUI[]>([]);
	const [dLeaderOptions, setDLeaderOptions] = useState<DropdownOption[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUsers = async () => {
		setLoading(true);
		const result = await userRepository.getUsers();
		const mappedUsers = result.map(mapUserToUI);
		const mappedDleadersDropdown = result.map(mapUserToDLeadersList);
		setUsers(mappedUsers);
		setDLeaderOptions(mappedDleadersDropdown);
		setLoading(false);
	};

	// const addUser = async (
	// 	user: Omit<User, "id" | "createdAt" | "updatedAt">
	// ) => {
	// 	await userRepository.addUser({
	// 		...user,
	// 		createdAt: new Date(),
	// 	});
	// 	await fetchUsers();
	// };

	// const getUser = async (id: string): Promise<User | null> => {
	// 	return await userRepository.getUserById(id);
	// };

	// const updateUser = async (id: string, data: Partial<User>) => {
	// 	await userRepository.updateUser(id, { ...data, updatedAt: new Date() });
	// 	await fetchUsers();
	// };

	// const deleteUser = async (id: string) => {
	// 	await userRepository.deleteUser(id);
	// 	await fetchUsers();
	// };

	useEffect(() => {
		fetchUsers();
	}, []);

	return {
		users,
		dLeaderOptions,
		loading,
		refresh: fetchUsers,
	};
};
