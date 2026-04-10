import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useEducationViewModel } from "../viewModel/useEducationViewModel";
import { CreateEducationDTO, CreateEducationListDTO } from "../model/Education";
import EducationLevel from "src/types/enums/EducationLevel";
import { useEducationQuery } from "./useAccountQuery";

function removeEmptyFields<T extends object>(obj: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) => value !== undefined && value !== null && value !== "",
		),
	) as Partial<T>;
}

interface UseEducationFormProps {
	educationId?: number;
	accountId: number;
	onSuccess?: () => void;
}

// 🔽 Initial Values
const initialValues = {
	schoolId: -1,
	educationLevel: "" as EducationLevel,
	course: "",
	startDate: "",
	endDate: "",
	isCurrent: false,
};

const seniorOrCollegeKeys: (keyof typeof EducationLevel)[] = [
	"College",
	"Doctoral",
	"Masteral",
	"SeniorHigh",
];

// 🔽 Validation Schema
export const validationSchema = Yup.object({
	schoolId: Yup.number()
		.required("School is required")
		.test(
			"valid-school",
			"School is required",
			(value) => value !== undefined && value > 0,
		),
	educationLevel: Yup.mixed<keyof typeof EducationLevel>()
		.oneOf(
			Object.keys(EducationLevel) as (keyof typeof EducationLevel)[],
			"Education Level is required",
		)
		.required("Education Level is required"),
	course: Yup.string().when("educationLevel", {
		is: (educationLevel: keyof typeof EducationLevel) =>
			seniorOrCollegeKeys.includes(educationLevel),
		then: (schema) => schema.required("Course is required"),
		otherwise: (schema) => schema.notRequired(),
	}),
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

export const useEducationForm = ({
	educationId,
	accountId,
	onSuccess,
}: UseEducationFormProps) => {
	const navigation = useNavigation();
	const { addEducation, updateEducation } = useEducationViewModel();

	const [loading, setLoading] = useState(false);
	const {
		data: education,
		isLoading,
		refetch,
	} = useEducationQuery(educationId);

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: async (values) => {
			try {
				setLoading(true);

				if (educationId) {
					const payload: CreateEducationDTO = {
						schoolId: values.schoolId,
						educationLevel: values.educationLevel,
						startDate: dayjs(values.startDate).toDate(),
						...(values.course && { course: values.course }),
						endDate: values.isCurrent ? null : dayjs(values.endDate).toDate(),
					};

					await updateEducation(educationId, payload);
				} else {
					const payload: CreateEducationListDTO = {
						accountId,
						educations: [
							{
								schoolId: values.schoolId,
								educationLevel: values.educationLevel,
								startDate: dayjs(values.startDate).toDate(),
								...(values.course && { course: values.course }),
								endDate: values.isCurrent
									? null
									: dayjs(values.endDate).toDate(),
							},
						],
					};
					await addEducation(payload);
				}

				onSuccess?.();
			} catch (error) {
				Alert.alert(
					"Error",
					`Failed to ${educationId ? "update" : "create"} education`,
				);
			} finally {
				setLoading(false);
			}
		},
	});

	// 🔽 Load education for edit mode
	useEffect(() => {
		if (!education) return;

		const loadEducation = async () => {
			formik.setValues({
				schoolId: education.school.id ?? null,
				educationLevel: education.educationLevel ?? "",
				course: education.course ?? "",
				startDate: education.startDate?.toString() ?? "",
				endDate: education.endDate?.toString() ?? "",
				isCurrent: !education.endDate,
			});
		};

		loadEducation();
	}, [education]);

	return {
		formik,
		loading,
		education,
		refreshEducation: refetch,
	};
};
