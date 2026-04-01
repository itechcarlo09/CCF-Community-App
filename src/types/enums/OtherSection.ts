import {
	mdiAccountGroupOutline,
	mdiBadgeAccountOutline,
	mdiBookOpenVariantOutline,
	mdiBriefcaseOutline,
	mdiDomain,
	mdiMicrophoneOutline,
	mdiSchoolOutline,
} from "@mdi/js";
import { OthersSection } from "../otherTypes";

export enum OthersItemKey {
	Ministries = "MINISTRIES",
	MinistryRoles = "MINISTRY_ROLES",
	Volunteers = "VOLUNTEERS",
	GuestSpeakers = "GUEST_SPEAKERS",
	Schools = "SCHOOLS",
	Companies = "COMPANIES",
	Series = "SERIES",
}

export const OTHERS_SECTIONS: OthersSection[] = [
	{
		title: "Organization",
		data: [
			{
				key: OthersItemKey.Ministries,
				label: "Ministries",
				description: "Manage church ministries",
				icon: mdiDomain,
				screen: "MinistryPage",
			},
		],
	},
	{
		title: "Speakers",
		data: [
			{
				key: OthersItemKey.GuestSpeakers,
				label: "Guest Speakers",
				description: "Manage external speakers",
				icon: mdiMicrophoneOutline,
				screen: "GuestSpeakerScreen",
			},
		],
	},
	{
		title: "Background Data",
		data: [
			{
				key: OthersItemKey.Schools,
				label: "Schools",
				icon: mdiSchoolOutline,
				screen: "SchoolListScreen",
			},
			{
				key: OthersItemKey.Companies,
				label: "Companies",
				icon: mdiBriefcaseOutline,
				screen: "CompanyListScreen",
			},
		],
	},
	{
		title: "Content",
		data: [
			{
				key: OthersItemKey.Series,
				label: "Series",
				description: "Manage event series",
				icon: mdiBookOpenVariantOutline,
				screen: "SeriesScreen",
			},
		],
	},
];
