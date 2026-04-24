export interface ModeCardProps {
	title: AppMode;
	icon: string;
	isActive: boolean;
	onPress: (mode: AppMode) => void;
}

export enum AppMode {
	MemberMode = "Member Mode",
	Management = "Management",
	SuperAdmin = "Super Admin",
}
