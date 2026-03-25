import Gender from "src/types/enums/Gender";

/**
 * Capitalize the first letter of a string
 * "hello world" → "Hello world"
 */
export const capitalizeFirst = (text: string): string => {
	if (!text) return "";
	return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Capitalize all words in a string
 * "hello world" → "Hello World"
 */
export const capitalizeWords = (text: string): string => {
	return text
		.split(" ")
		.map((word) => capitalizeFirst(word))
		.join(" ");
};

/**
 * Get the first letter (initial) of a name
 * "Hello" → "H"
 */
export const getInitial = (name?: string): string => {
	return name?.charAt(0).toUpperCase() ?? "";
};

/**
 * Convert a string to camelCase
 * "first name" → "firstName"
 */
export const toCamelCase = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
};

/**
 * Trim and normalize spaces
 * "  hello   world " → "hello world"
 */
export const normalizeSpace = (text: string): string => {
	return text.trim().replace(/\s+/g, " ");
};

/**
 * Format name by capitalizing Last and First names and getting the initial of Middle name
 * "First, Middle, Last" → "Last, First M."
 */
export const formatFullName = (
	first?: string,
	last?: string,
	middle?: string,
): string => {
	const safeFirst = first ?? "";
	const safeLast = last ?? "";

	return `${capitalizeFirst(safeLast)}, ${capitalizeWords(safeFirst)}${
		middle ? ` ${getInitial(middle)}.` : ""
	}`;
};

/**
 * Format full name as:
 * "First Middle Last"
 */
export const formatCompleteName = (
	first?: string,
	middle?: string,
	last?: string,
): string => {
	const safeFirst = first ?? "";
	const safeMiddle = middle ?? "";
	const safeLast = last ?? "";

	const formattedFirst = capitalizeWords(safeFirst);
	const formattedMiddle = safeMiddle ? ` ${capitalizeWords(safeMiddle)}` : "";
	const formattedLast = safeLast ? ` ${capitalizeWords(safeLast)}` : "";

	return `${formattedFirst}${formattedMiddle}${formattedLast}`.trim();
};

/**
 * Formats a phone number into XXX-XXX-XXXX.
 * Non-numeric characters are removed automatically.
 */
export const formatPhoneNumber = (value: string): string => {
	const cleaned = value.replace(/\D/g, ""); // remove non-digits

	if (cleaned.length <= 3) {
		return cleaned;
	}
	if (cleaned.length <= 6) {
		return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
	}
	return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
		6,
		10,
	)}`;
};

export const isNullOrEmpty = (value: any): boolean => {
	return (
		value === null ||
		value === undefined ||
		(typeof value === "string" && value.trim() === "") ||
		(Array.isArray(value) && value.length === 0) ||
		(typeof value === "object" &&
			!Array.isArray(value) &&
			Object.keys(value).length === 0)
	);
};

export const normalizePHNumber = (number: string): string => {
	// Remove spaces, dashes, or parentheses
	number = number.replace(/[\s\-\(\)]/g, "");

	if (number.startsWith("+63")) {
		return number.slice(3); // Remove '+63'
	} else if (number.startsWith("0")) {
		return number.slice(1); // Remove leading '0'
	} else {
		return number; // Already normalized
	}
};

export const normalizeGender = (gender?: string): Gender | undefined => {
	if (!gender) return undefined;

	const normalized =
		gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

	if (normalized === Gender.Male || normalized === Gender.Female) {
		return normalized as Gender;
	}

	return undefined;
};
