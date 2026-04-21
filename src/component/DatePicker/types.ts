export interface DatePickerFieldProps {
	name: string;
	label?: string;
	value: Date | string | null;
	touched?: boolean;
	error?: string;
	required?: boolean;
	onChange: (field: string, value: any) => void;
	mode?: "date" | "time" | "datetime";
	isYearOnly?: boolean;
}
