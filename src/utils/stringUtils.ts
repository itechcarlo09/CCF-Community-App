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
	first: string,
	last: string,
	middle?: string
): string => {
	return `${capitalizeFirst(last)}, ${capitalizeWords(first)}${
		middle ? ` ${getInitial(middle)}.` : ""
	}`;
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
