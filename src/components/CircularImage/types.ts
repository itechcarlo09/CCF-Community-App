export interface CircularImageProps {
	uri?: string | null;
	size?: number;
	fallbackText?: string; // e.g., initials or "?" if image is missing
}
