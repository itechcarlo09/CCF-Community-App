import {
	mdiHome,
	mdiHomeOutline,
	mdiCalendarBlank,
	mdiCalendarBlankOutline,
	mdiListBox,
	mdiListBoxOutline,
	mdiAccountCircle,
	mdiAccountCircleOutline,
} from "@mdi/js";

export const tabIconMap = {
	HomeTab: {
		focused: mdiHome,
		unfocused: mdiHomeOutline,
	},
	EventTab: {
		focused: mdiCalendarBlank,
		unfocused: mdiCalendarBlankOutline,
	},
	UserTab: {
		focused: mdiListBox,
		unfocused: mdiListBoxOutline,
	},
	DGroupTab: {
		focused: mdiAccountCircle,
		unfocused: mdiAccountCircleOutline,
	},
	OthersTab: {
		focused: mdiAccountCircle,
		unfocused: mdiAccountCircleOutline,
	},
};
