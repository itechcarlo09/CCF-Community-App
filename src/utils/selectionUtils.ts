import { SelectionProps } from "src/types/selectionTypes";

export const mapEnumToOptions = <T extends Record<string, string>>(
	enumObj: T,
): SelectionProps<T[keyof T]>[] => {
	return (Object.values(enumObj) as T[keyof T][]).map((value) => ({
		label: value,
		value,
	}));
};
