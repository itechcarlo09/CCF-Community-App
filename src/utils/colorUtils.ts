import { ViewStyle } from "react-native";

export function adjustColor(hex: string, amount: number) {
	let usePound = false;
	if (hex[0] === "#") {
		hex = hex.slice(1);
		usePound = true;
	}

	const num = parseInt(hex, 16);

	let r = (num >> 16) + amount;
	let g = ((num >> 8) & 0x00ff) + amount;
	let b = (num & 0x0000ff) + amount;

	r = Math.min(255, Math.max(0, r));
	g = Math.min(255, Math.max(0, g));
	b = Math.min(255, Math.max(0, b));

	return (
		(usePound ? "#" : "") +
		((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
	);
}

export function getBackgroundColor(style?: ViewStyle | ViewStyle[]): string {
	if (!style) return "#E1E9EE"; // default

	const flattenStyle = Array.isArray(style)
		? Object.assign({}, ...style)
		: style;

	return (flattenStyle.backgroundColor as string) || "#E1E9EE";
}
