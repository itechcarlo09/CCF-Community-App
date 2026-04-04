import { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GradeYear, { gradeYearOptions } from "src/types/enums/GradeYear";
import { useEducationViewModel } from "../viewModel/useEducationViewModel";
import { EducationDTO, SchoolDTO } from "../model/user";
import { CreateEducationDTO, CreateEducationListDTO } from "../model/Education";

interface UseEducationFormProps {
	educationId?: number;
	onSuccess?: () => void;
}

// 🔽 Initial Values
const initialValues = {
	accountId: -1,
	schoolId: -1,
	gradeYear: "" as GradeYear | "",
	course: "",
	startDate: "",
	endDate: "",
	isCurrent: false,
	gradeOpen: false,
	gradeItems: gradeYearOptions,
};

const seniorOrCollege: GradeYear[] = [
	GradeYear.Grade11,
	GradeYear.Grade12,
	GradeYear.FirstYearCollege,
	GradeYear.SecondYearCollege,
	GradeYear.ThirdYearCollege,
	GradeYear.FourthYearCollege,
	GradeYear.FifthYearCollege,
	GradeYear.UnderGraduate,
	GradeYear.Graduated,
];

// 🔽 Validation Schema
export const validationSchema = Yup.object({
	accountId: Yup.number().required("Account is required"),
	schoolId: Yup.number().required("School is required"),
	gradeYear: Yup.mixed<GradeYear>()
		.oneOf(Object.values(GradeYear))
		.required("Grade Year is required"),
	course: Yup.string().when("gradeYear", {
		is: (gradeYear: any) => seniorOrCollege.includes(gradeYear),
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
	onSuccess,
}: UseEducationFormProps) => {
	const navigation = useNavigation();
	const { addEducation, updateEducation, getEducation } =
		useEducationViewModel();

	const [loading, setLoading] = useState(false);
	const [education, setEducation] = useState<any | null>(null);

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				setLoading(true);

				if (educationId) {
					const payload: Partial<CreateEducationDTO> = {};

					await updateEducation(educationId.toString(), payload);
				} else {
					const payload: CreateEducationDTO = {
						schoolId: 0,
						gradeYear: GradeYear.PreSchool,
						startYear: 0,
						...(values.course && { course: values.course }),
						...(values.endDate && { endYear: parseInt(values.endDate) }),
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
		if (!educationId) return;

		const loadEducation = async () => {
			try {
				setLoading(true);
				const data = await getEducation(educationId.toString());
				if (!data) return;

				setEducation(data);

				formik.setValues({
					school: data.school ?? null,
					gradeYear: data.gradeYear ?? "",
					course: data.course ?? "",
					startYear: data.startYear?.toString() ?? "",
					endYear: data.endYear?.toString() ?? "",
					isCurrent: !!data.isCurrent,
					gradeOpen: false,
					gradeItems: gradeYearOptions,
				});
			} catch {
				Alert.alert("Error", "Failed to load education");
				navigation.goBack();
			} finally {
				setLoading(false);
			}
		};

		loadEducation();
	}, [educationId]);

	// 🔽 Refresh (optional)
	const refreshEducation = async () => {
		if (!educationId) return;
		const data = await getEducation(educationId.toString());
		if (data) setEducation(data);
	};

	return {
		formik,
		loading,
		education,
		refreshEducation,
	};
};
