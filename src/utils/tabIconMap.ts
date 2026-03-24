import {
	mdiCog,
	mdiCogOutline,
	mdiAccount,
	mdiAccountGroup,
	mdiAccountGroupOutline,
	mdiAccountOutline,
	mdiCalendar,
	mdiCalendarOutline,
	mdiViewDashboard,
	mdiViewDashboardOutline,
} from "@mdi/js";

export const tabIconMap = {
	DashboardTab: {
		focused: mdiViewDashboard,
		unfocused: mdiViewDashboardOutline,
	},
	EventTab: {
		focused: mdiCalendar,
		unfocused: mdiCalendarOutline,
	},
	UserTab: {
		focused: mdiAccount,
		unfocused: mdiAccountOutline,
	},
	DGroupTab: {
		focused: mdiAccountGroup,
		unfocused: mdiAccountGroupOutline,
	},
	OthersTab: {
		focused: mdiCog,
		unfocused: mdiCogOutline,
	},
};
