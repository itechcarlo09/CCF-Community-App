import { useState } from "react";
import { userRepository } from "../data/userRepository";
import { User } from "../model/user";
import { ageNumber } from "../../../utils/dateFormatter";
import { formatFullName } from "../../../utils/stringUtils";
import { RecordItemUI } from "../model/RecordListItem";
import { DropdownOption } from "../../../types/dropdownOption";
import topUsers from "../topUsers.json";
import { MembershipType } from "../types";
import Gender from "../../../types/enums/Gender";

const MAX_AGE_FOR_ELEVATE = 22;
const MIN_DGROUP_MEMBERS_FOR_DLEADER = 3;
const MIN_DGROUP_MEMBERS_FOR_TIMOTHY = 1;

const mapUserToUI = (user: User): RecordItemUI => {
	const fallbackText = `${user.firstName[0]}${user.lastName[0]}`;
	const fullName = formatFullName(
		user.firstName,
		user.lastName,
		user.middleName,
	);
	const age = ageNumber(user.birthDate);

	const ministryText =
		age <= MAX_AGE_FOR_ELEVATE ? "ELEVATE Youth" : "B1G Singles";
	const topUser = topUsers.find((topUser) => topUser.email === user.email);
	const dleaderName =
		topUser?.dleaderName ??
		(user.dGroupLeader
			? formatFullName(
					user.dGroupLeader.firstName,
					user.dGroupLeader.lastName,
					user.dGroupLeader.middleName,
			  )
			: null);

	let membershipType: MembershipType;
	if (
		topUser ||
		(user.dGroupMembers &&
			user.dGroupMembers.length >= MIN_DGROUP_MEMBERS_FOR_DLEADER)
	) {
		membershipType = "DLeader";
	} else if (
		user.dGroupMembers &&
		user.dGroupMembers.length >= MIN_DGROUP_MEMBERS_FOR_TIMOTHY
	) {
		membershipType = "Timothy";
	} else if (user.dGroupLeader) {
		membershipType = "DMember";
	} else {
		membershipType = "Pending Member";
	}

	return {
		id: user.id,
		fallbackText,
		fullName,
		age,
		ministryText,
		status: "Active Member",
		dleaderName,
		membershipType,
	};
};

const mapUserToDLeadersList = (user: User): DropdownOption => ({
	label: formatFullName(user.firstName, user.lastName, user.middleName),
	value: String(user.id),
});

export const useUserViewModel = () => {
	const [users, setUsers] = useState<RecordItemUI[]>([]);
	const [dLeaderOptions, setDLeaderOptions] = useState<DropdownOption[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const result = await userRepository.getUsers();
			const mappedUsers = result.map(mapUserToUI);
			const mappedDleadersDropdown = result.map(mapUserToDLeadersList);
			setUsers(mappedUsers);
			setDLeaderOptions(mappedDleadersDropdown);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const addUser = async (
		user: Omit<User, "id" | "createdAt" | "updatedAt">,
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

	const getUser = async (id: string): Promise<User | null> => {
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
			return dleaders.map(mapUserToUI);
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
				await fetchUsers();
				return;
			}
			const result = await userRepository.searchUsers(searchText);
			const mappedUsers = result.map(mapUserToUI);
			setUsers(mappedUsers);
		} catch (error) {
			console.error("Error searching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateUser = async (id: string, data: Partial<User>) => {
		try {
			setLoading(true);
			await userRepository.updateUser(id, { ...data, updatedAt: new Date() });
		} catch (error) {
			console.error("Error updating user:", error);
		} finally {
			setLoading(false);
		}
	};

	// const deleteUser = async (id: string) => {
	// 	await userRepository.deleteUser(id);
	// 	await fetchUsers();
	// };

	return {
		users,
		dLeaderOptions,
		loading,
		addUser,
		updateUser,
		searchUsers,
		getUser,
		getDLeaders,
		refresh: fetchUsers,
		fetchUsers,
	};
};
