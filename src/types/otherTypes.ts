import { OthersItemKey } from "./enums/OtherSection";

export type OthersItem = {
	key: OthersItemKey;
	label: string;
	description?: string;
	icon?: string;
	screen: string;
};

export type OthersSection = {
	title: string;
	data: OthersItem[];
};
