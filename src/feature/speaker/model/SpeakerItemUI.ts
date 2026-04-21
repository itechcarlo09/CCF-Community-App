export interface SpeakerItemUI {
	id: number;
	name: string;
	fallbackName?: string; // for CircularImage fallback
	image?: string;
	onPress?: () => void;
}
