import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

/**
 * Format full readable date: January 5, 2025
 */
export const formatFullDate = (date: Date | string | null): string => {
	return date ? dayjs(date).format("MMMM D, YYYY") : "";
};

/**
 * Format short date: 05 Jan 2025
 */
export const formatShortDate = (date: Date | string | null): string => {
	return date ? dayjs(date).format("DD MMM YYYY") : "";
};

/**
 * Format with time: Jan 5, 2025 - 3:30 PM
 */
export const formatDateTime = (date: Date | string | null): string => {
	return date ? dayjs(date).format("MMM D, YYYY - h:mm A") : "";
};

/**
 * Convert Firebase Timestamp or ISO string to Date object
 */
export const toDate = (input: any): Date => {
	if (input?.toDate) return input.toDate(); // Firebase Timestamp
	if (typeof input === "string") return new Date(input); // ISO
	return input instanceof Date ? input : new Date();
};

/**
 * Format to localized string using device settings
 * e.g., Jan 5, 2025 or 5 Ene 2025 (based on locale)
 */
export const formatLocalized = (date: Date | string | null): string => {
	return date ? dayjs(date).format("LL") : "";
};
