import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useEmploymentViewModel } from "../viewModel/useEmploymentViewModel";
import { useEmploymentQuery } from "./useAccountQuery";
import {
	CreateEmploymentDTO,
	CreateEmploymentListDTO,
} from "../model/Employment";

interface UseEmploymentFormProps {
	employmentId?: number;
	accountId: number;
	onSuccess?: () => void;
}

const initialValues = {
	companyId: -1,
	position: "",
	startDate: "",
	endDate: "",
	isCurrent: false,
};

export const validationSchema = Yup.object({
	companyId: Yup.number()
		.required("Company is required")
		.test(
			"valid-company",
			"Company is required",
			(value) => value !== undefined && value > 0,
		),

	position: Yup.string().required("Position is required"),

	startDate: Yup.date()
		.required("Start date is required")
		.min(new Date(1900, 0, 1), "Invalid date")
		.max(new Date(), "Start date cannot be in the future"),

	endDate: Yup.date().when("isCurrent", {
		is: false,
		then: (schema) =>
			schema
				.required("End date is required")
				.min(Yup.ref("startDate"), "End date cannot be before Start date")
				.max(new Date(), "End date cannot be in the future"),
		otherwise: (schema) => schema.notRequired(),
	}),

	isCurrent: Yup.boolean(),
});

export const useEmploymentForm = ({
	employmentId,
	accountId,
	onSuccess,
}: UseEmploymentFormProps) => {
	const { addEmployment, updateEmployment } = useEmploymentViewModel();

	const {
		data: employment,
		isLoading,
		refetch,
	} = useEmploymentQuery(employmentId);

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: async (values) => {
			if (employmentId) {
				const payload: CreateEmploymentDTO = {
					companyId: values.companyId,
					position: values.position,
					startDate: dayjs(values.startDate).toDate(),
					endDate: values.isCurrent ? null : dayjs(values.endDate).toDate(),
				};

				await updateEmployment(employmentId, payload);
			} else {
				const payload: CreateEmploymentListDTO = {
					accountId,
					employments: [
						{
							companyId: values.companyId,
							position: values.position,
							startDate: dayjs(values.startDate).toDate(),
							endDate: values.isCurrent ? null : dayjs(values.endDate).toDate(),
						},
					],
				};

				await addEmployment(payload);
			}

			onSuccess?.();
		},
	});

	useEffect(() => {
		if (!employment) return;

		formik.setValues({
			companyId: employment.company.id ?? -1,
			position: employment.position ?? "",
			startDate: dayjs(employment.startDate).format("YYYY-MM-DD"),
			endDate: employment.endDate?.toString() ?? "",
			isCurrent: !employment.endDate,
		});
	}, [employment]);

	return {
		formik,
		isLoading,
		employment,
		refreshEmployment: refetch,
	};
};
