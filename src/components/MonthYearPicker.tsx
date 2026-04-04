import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { Dropdown } from "./Dropdown";

interface MonthYearPickerProps {
	value: Date | string | null;
	onChange: (date: Date) => void;
	label?: string;
	required?: boolean;
	error?: string;
	touched?: boolean;
	minDate?: Date;
	maxDate?: Date;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
	value,
	onChange,
	label = "Date",
	required = false,
	error,
	touched,
	minDate,
	maxDate,
}) => {
	const minYear = minDate ? dayjs(minDate).year() : 1900;
	const maxYear = maxDate ? dayjs(maxDate).year() : new Date().getFullYear();

	// Year options
	const yearItems = useMemo(() => {
		const years = [];
		for (let y = maxYear; y >= minYear; y--) {
			years.push({ label: String(y), value: y });
		}
		return years;
	}, [minYear, maxYear]);

	const selectedYear = value ? dayjs(value).year() : null;
	const selectedMonth = value ? dayjs(value).month() : null;

	// Month options, filtered based on minDate/maxDate
	const monthItems = useMemo(() => {
		const months = Array.from({ length: 12 }, (_, i) => ({
			label: dayjs().month(i).format("MMMM"),
			value: i,
		}));

		return months.filter((month) => {
			if (selectedYear === null) return true;

			// Check minDate
			if (minDate && selectedYear === dayjs(minDate).year()) {
				if (month.value < dayjs(minDate).month()) return false;
			}

			// Check maxDate
			if (maxDate && selectedYear === dayjs(maxDate).year()) {
				if (month.value > dayjs(maxDate).month()) return false;
			}

			return true;
		});
	}, [selectedYear, minDate, maxDate]);

	const handleMonthChange = (month: number) => {
		const newDate = dayjs(value || new Date())
			.month(month)
			.date(1)
			.toDate();
		onChange(newDate);
	};

	const handleYearChange = (year: number) => {
		// If current month is outside new year bounds, adjust
		let newMonth = selectedMonth ?? 0;

		if (
			minDate &&
			year === dayjs(minDate).year() &&
			newMonth < dayjs(minDate).month()
		) {
			newMonth = dayjs(minDate).month();
		}
		if (
			maxDate &&
			year === dayjs(maxDate).year() &&
			newMonth > dayjs(maxDate).month()
		) {
			newMonth = dayjs(maxDate).month();
		}

		const newDate = dayjs(value || new Date())
			.year(year)
			.month(newMonth)
			.date(1)
			.toDate();
		onChange(newDate);
	};

	return (
		<View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>{label}</Text>
				{required && <Text style={styles.required}> *</Text>}
			</View>

			<View style={styles.row}>
				<View style={styles.dropdownContainer}>
					<Dropdown
						items={monthItems}
						value={selectedMonth}
						onChange={handleMonthChange}
						placeholder="Month"
						error={error}
						touched={touched}
					/>
				</View>
				<View style={styles.dropdownContainer}>
					<Dropdown
						items={yearItems}
						value={selectedYear}
						onChange={handleYearChange}
						placeholder="Year"
						error={error}
						touched={touched}
					/>
				</View>
			</View>
			{touched && error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	labelRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
	label: { fontSize: 12, color: "#6B7280" },
	required: { color: "#EF4444", fontSize: 14, fontWeight: "600" },
	row: { flexDirection: "row", gap: 8 },
	dropdownContainer: { flex: 1 },
	errorText: { color: "red", fontSize: 12, marginTop: 4 },
});
