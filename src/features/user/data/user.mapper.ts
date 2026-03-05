import { ageNumber } from "../../../utils/dateFormatter";
import { formatFullName } from "../../../utils/stringUtils";
import { RecordItemUI } from "../model/RecordListItem";
import { User } from "../model/user";
import topUsers from "../topUsers.json";
import { MembershipType } from "../types";

const MAX_AGE_FOR_ELEVATE = 22;
const MIN_DGROUP_MEMBERS_FOR_DLEADER = 3;
const MIN_DGROUP_MEMBERS_FOR_TIMOTHY = 1;

export const mapUserToUI = (user: User): RecordItemUI => {
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
