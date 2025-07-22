import { FieldInputProps, FormikProps } from "formik";

export type DatePickerProps = {
	field: FieldInputProps<Date>;
	form: FormikProps<any>;
	label?: string;
	maximumDate?: Date;
};
