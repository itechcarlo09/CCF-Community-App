export const lightColors = {
	text: "#111827",
	muted: "#6B7280",
	primary: "#58B9DA",
	border: "#D1D5DB",
	button: "#00A6B6",
	buttonClicked: "#008C9A",
	success: {
		backgroundColor: "#ECFDF3", // light green
		borderColor: "#12B76A",
		textColor: "#027A48",
	},
	error: {
		backgroundColor: "#FEF3F2", // light red
		borderColor: "#F04438",
		textColor: "#B42318",
	},
	default: {
		backgroundColor: "#DBEAFE", // light blue
		borderColor: "#3B82F6", // primary blue
		textColor: "#1E3A8A", // deep blue
	},
	disabled: {
		disabledBackground: "#F5F5F5",
		disabledText: "#A0A0A0",
		disabledBorder: "#E0E0E0",
	},
	card: "#FFF",
	white: "#FFF",
	black: "#000",

	secondary: "#F59E0B",
	background: "#FFFFFF",

	textDanger: {
		onDanger: {
			secondary: "#900B09",
		},
	},
	textPositive: {
		secondary: "#009951",
	},
	badge: {
		primary: {
			background: "#DFE7F6",
			text: "#2C58A0",
		},
		secondary: {
			background: "#EBEDEF",
			text: "#40464F",
		},
		warning: {
			background: "#FBF0DA",
			text: "#73510D",
		},
		success: {
			background: "#D6F0E0",
			text: "#0D6832",
		},
	},
	gray: {
		50: "#F9FAFB", // background for screens
		100: "#F3F4F6", // SearchField background
		200: "#E5E7EB", // light boxes / cards background
		300: "#D1D5DB", // borders
		400: "#9CA3AF", // placeholder text / icons
		500: "#6B7280", // medium gray text / icons
		600: "#4B5563", // darker gray text
		700: "#374151", // headings / titles
		800: "#1F2937", // primary text color
		900: "#111827", // bold / main text
	},
	blue: {
		50: "#EFF6FF",
		100: "#60A5FA",
		200: "#3B82F6",
		300: "#2563EB",
		400: "#1D4ED8",
		500: "#3B82F6",
		600: "#1E40AF",
		700: "#1E3A8A",
		800: "#1E3A8A",
		900: "#1E3A8A",
	},
	slate: {
		50: "#F8FAFC",
		100: "#F1F5F9",
		200: "#E2E8F0",
		300: "#CBD5E1",
		400: "#94A3B8",
		500: "#64748E",
		600: "#475569",
		700: "#334155",
		800: "#1E293B",
		900: "#0F172A",
	},
	icon: {
		danger: {
			tertiary: "#EC221F",
		},
	},
};

export const darkColors = {
	text: "#FFF",
	muted: "#9CA3AF",
	primary: "#58B9DA",
	border: "#D1D5DB",
	button: "#00A6B6",
	buttonClicked: "#008C9A",
	success: {
		backgroundColor: "#ECFDF3", // light green
		borderColor: "#12B76A",
		textColor: "#027A48",
	},
	error: {
		backgroundColor: "#FEF3F2", // light red
		borderColor: "#F04438",
		textColor: "#B42318",
	},
	default: {
		backgroundColor: "#F9FAFB", // light gray
		borderColor: "#D0D5DD",
		textColor: "#344054",
	},
	disabled: {
		disabledBackground: "#2A2A2A",
		disabledText: "#6B6B6B",
		disabledBorder: "#3A3A3A",
	},
	card: "#1F2937",
	white: "#FFF",
	black: "#000",

	secondary: "#FBBF24",
	background: "#111827",
	badge: {
		primary: {
			background: "#DFE7F6",
			text: "#2C58A0",
		},
		secondary: {
			background: "#EBEDEF",
			text: "#40464F",
		},
		success: {
			background: "#D6F0E0",
			text: "#0D6832",
		},
	},
	gray: {
		200: "#E5E7EB",
		500: "#6B7280",
		900: "#111827",
	},
	blue: {
		50: "#EFF6FF",
		100: "#60A5FA",
		200: "#3B82F6",
		300: "#2563EB",
		400: "#1D4ED8",
		500: "#3B82F6",
		600: "#1E40AF",
		700: "#1E3A8A",
		800: "#1E3A8A",
		900: "#1E3A8A",
	},
	slate: {
		50: "#F8FAFC",
		100: "#F1F5F9",
		200: "#E2E8F0",
		300: "#CBD5E1",
		400: "#94A3B8",
		500: "#64748B",
		600: "#475569",
		700: "#334155",
		800: "#1E293B",
		900: "#0F172A",
	},
	icon: {
		danger: {
			tertiary: "#EC221F",
		},
	},
};

export type ThemeType = typeof lightColors;
