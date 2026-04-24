export interface ModeCardProps {
	title: string;
	icon: string;
	isActive: boolean;
	onPress: () => void;
}

export enum AppMode {
	MemberMode = "Member Mode",
	Management = "Management",
}
