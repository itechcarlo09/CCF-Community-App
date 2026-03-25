import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { MONTHS } from "src/types/globalTypes";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

/**
 * Returns list of current year untill 99 years less.
 * @param birthdate A JS Date or ISO string
 */
export const getYearsNowMinus99 = (year: number = new Date().getFullYear()) => {
	const currentYear = new Date(year, 0, 1).getFullYear();
	const years: number[] = [];

	for (let year = currentYear; year >= currentYear - 99; year--) {
		years.push(year);
	}

	return years;
};

/**
 * Returns age in years from a given birthdate.
 * @param birthdate A JS Date or ISO string
 */
export const ageNumber = (birthdate?: Date | string): number => {
	if (!birthdate) return 0;

	const date = dayjs(birthdate);
	const now = dayjs();

	const age = now.diff(date, "year");
	return age;
};

/**
 * Returns new Date when year added.
 * @param dateToSet A JS Date or ISO string
 * @param years A number
 */
export const addYearsAsDate = (
	dateToSet: Date | string,
	years: number,
): Date => {
	return dayjs(dateToSet).add(years, "year").toDate();
};

/**
 * Returns age in years from a given birthdate.
 * @param birthdate A JS Date or ISO string
 */
export const ageNow = (birthdate?: Date | string): string => {
	if (!birthdate) return "-";

	const date = dayjs(birthdate);
	const now = dayjs();

	const age = now.diff(date, "year");
	return `${age} years old`;
};

// Example: show "3 hours ago", "in 2 days"
export const fromNow = (value: Date | string | null | undefined): string => {
	if (!value) return "-";
	return dayjs(value).fromNow();
};

/**
 * Format full readable date: January 5, 2025
 */
export const formatYear = (date: Date | string | null): string => {
	return date ? dayjs(date).format("YYYY") : "";
};

/**
 * Format Year Range
 */
export const formatYearRange = (start?: number, end?: number): string => {
	if (!start && !end) return "";

	if (start && !end) return `${start} - Present`;

	if (start && end) return `${start} - ${end}`;

	return `${end}`; // fallback (rare)
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

/**
 * to check if the date is within 3 months from the current date
 */
export const isWithinLastThreeMonths = (date: Date | string): boolean => {
	const now = dayjs();
	const threeMonthsAgo = now.subtract(3, "month");

	// Inclusive check: date is between 3 months ago and today
	return (
		dayjs(date).isAfter(threeMonthsAgo) &&
		dayjs(date).isBefore(now.add(1, "day"))
	);
};

export const formatMonthYearFromDate = (date?: Date): string => {
	if (!date) return "";

	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();

	return `${month} ${year}`;
};

export const formatDateForDisplay = (dateString: string) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date); // → "January 1, 2000"
};

export const formatPHNumber = (text: string) => {
	// remove non-digit
	let digits = text.replace(/\D/g, "");

	// only allow max 10 digits
	if (digits.length > 10) digits = digits.slice(0, 10);

	// format XXX-XXX-XXXX
	const part1 = digits.slice(0, 3);
	const part2 = digits.slice(3, 6);
	const part3 = digits.slice(6, 10);

	let formatted = "";
	if (part1) formatted += part1;
	if (part2) formatted += "-" + part2;
	if (part3) formatted += "-" + part3;

	return formatted;
};

// src/utils/dateFormatter.ts
export const normalizeDate = (
	date?: string | null | Date,
): Date | undefined => {
	if (!date) return undefined;
	if (date instanceof Date) return date;
	const parsed = new Date(date);
	return isNaN(parsed.getTime()) ? undefined : parsed;
};

/**
 * Format a range of dates nicely.
 * Examples:
 *  - start: 2020-05-10, end: 2023-03-20 → May 2020 – Mar 2023
 *  - start: 2022-08-01, end: undefined → Aug 2022 – Present
 */
export const formatDateRangeFromDate = (
	start?: string | null | Date,
	end?: string | null | Date,
	includeDay: boolean = false,
): string => {
	const startDate = normalizeDate(start);
	const endDate = normalizeDate(end);

	const options: Intl.DateTimeFormatOptions = includeDay
		? { year: "numeric", month: "short", day: "numeric" }
		: { year: "numeric", month: "short" };

	if (!startDate && !endDate) return "N/A";
	if (!startDate)
		return endDate?.toLocaleDateString(undefined, options) ?? "N/A";
	if (!endDate)
		return `${startDate.toLocaleDateString(undefined, options)} – Present`;

	return `${startDate.toLocaleDateString(
		undefined,
		options,
	)} – ${endDate.toLocaleDateString(undefined, options)}`;
};

/**
 * Format a single date nicely
 */
export const formatFullDate = (
	date?: string | null | Date,
	includeDay: boolean = true,
) => {
	const d = normalizeDate(date);
	if (!d) return "N/A";

	const options: Intl.DateTimeFormatOptions = includeDay
		? { year: "numeric", month: "short", day: "numeric" }
		: { year: "numeric", month: "short" };

	return d.toLocaleDateString(undefined, options);
};
