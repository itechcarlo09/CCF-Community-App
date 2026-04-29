import dayjs from "dayjs";
import { ageNumber } from "../../../utils/dateFormatter";
import { formatCompleteName, formatFullName } from "../../../utils/stringUtils";
import { MemberCardModel } from "../model/Member";
import { RecordItemUI } from "../model/RecordListItem";
import { Gender, UserDTO } from "../model/user";
import topUsers from "../topUsers.json";

const MAX_AGE_FOR_ELEVATE = 22;
const MIN_DGROUP_MEMBERS_FOR_DLEADER = 3;
const MIN_DGROUP_MEMBERS_FOR_TIMOTHY = 1;

export const mapUserToUI = (user: UserDTO): RecordItemUI => {
	const id = user.id;
	const fallbackText = `${user.firstName[0]}${user.lastName[0]}`;
	const fullName = formatFullName(
		user.firstName,
		user.lastName,
		user.middleName,
	);
	const completeName = formatCompleteName(
		user.firstName,
		user.middleName,
		user.lastName,
	);
	const age = ageNumber(user.birthDate);
	const url = user.profilePicture;

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
			: undefined);

	const spouseName = user.spouse
		? formatFullName(
				user.spouse.firstName,
				user.spouse.lastName,
				user.spouse.middleName,
		  )
		: undefined;

	const isActive = user.isActive ?? false;

	const membershipType = user.dGroupStatus;
	return {
		id,
		url,
		fallbackText,
		fullName,
		completeName,
		age,
		ministryText,
		isActive,
		dleaderName,
		spouseName,
		membershipType,
	};
};

export const toMemberCard = (member: UserDTO): MemberCardModel => ({
	id: member.id,
	fullName: formatFullName(
		member.firstName,
		member.lastName,
		member.middleName,
	),
	membershipType: member.dGroupStatus,
	gender: member.gender as Gender,
	priorityMinistry: "",
	latestDGroup: dayjs().toDate(),
	latestActivity: dayjs().toDate(),
});
