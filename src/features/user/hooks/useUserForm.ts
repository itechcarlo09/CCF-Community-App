import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { User } from "../model/user";
import { EducationEmploymentConfig } from "../../../types/userTypes";

interface UseUserFormProps {
	userId?: string;
}

const staticInitialValues = {
	firstName: "",
	middleName: "",
	lastName: "",
	birthdate: "",
	gender: "",
	leaderId: "",
	contactNumber: "",
	email: "",
	facebook: "",
	emergencyPerson: "",
	emergencyNumber: "",
};

const staticSchema = Yup.object({
	firstName: Yup.string().required("Please enter a valid first name"),
	lastName: Yup.string().required("Please enter a valid last name"),
	birthdate: Yup.date().nullable().required("Birthdate is required"),
	gender: Yup.string().required("Please select a gender"),
	// contactNumber: Yup.string()
	// 	.required("Contact number is required")
	// 	.test("starts-with-9", "Contact number must start with 9", (value) => {
	// 		if (!value) return false;
	// 		const digitsOnly = value.replace(/\D/g, "");
	// 		return digitsOnly.startsWith("9");
	// 	})
	// 	.test(
	// 		"length-check",
	// 		"Contact number must have exactly 10 digits",
	// 		(value) => {
	// 			if (!value) return false;
	// 			const digitsOnly = value.replace(/\D/g, "");
	// 			return digitsOnly.length === 10;
	// 		}
	// 	)
	// 	.test(
	// 		"dash-format",
	// 		"Contact number must be in the format 999-999-9999",
	// 		(value) => {
	// 			if (!value) return false;
	// 			return /^\d{3}-\d{3}-\d{4}$/.test(value);
	// 		}
	// 	),
	email: Yup.string()
		.email("Please enter a valid email address")
		.required("Email is required"),
	// facebook: Yup.string().required("Please enter a valid facebook"),
	// emergencyPerson: Yup.string().required("Please enter a valid contact person"),
	// emergencyNumber: Yup.string()
	// 	.required("Contact number is required")
	// 	.test("starts-with-9", "Contact number must start with 9", (value) => {
	// 		if (!value) return false;
	// 		const digitsOnly = value.replace(/\D/g, "");
	// 		return digitsOnly.startsWith("9");
	// 	})
	// 	.test(
	// 		"length-check",
	// 		"Contact number must have exactly 10 digits",
	// 		(value) => {
	// 			if (!value) return false;
	// 			const digitsOnly = value.replace(/\D/g, "");
	// 			return digitsOnly.length === 10;
	// 		}
	// 	)
	// 	.test(
	// 		"dash-format",
	// 		"Contact number must be in the format 999-999-9999",
	// 		(value) => {
	// 			if (!value) return false;
	// 			return /^\d{3}-\d{3}-\d{4}$/.test(value);
	// 		}
	// 	),
});

export const useUserForm = ({ userId }: UseUserFormProps) => {
	const [loading, setLoading] = useState(false);
	const dynamicInitialValues: Record<string, EducationEmploymentConfig> = {};
	const navigation = useNavigation();
	const { addUser, getUser } = useUserViewModel();
	const route = useRoute();
	const onSuccess = (route.params as any)?.onSuccess;

	const [educationFields, setEducationFields] = useState<
		EducationEmploymentConfig[]
	>([]);
	const [employmentFields, setEmploymentFields] = useState<
		EducationEmploymentConfig[]
	>([]);
	const [nextEduId, setNextEduId] = useState(1);
	const [nextEmpId, setNextEmpId] = useState(1);

	const getYearsNowMinus99 = useCallback(() => {
		const currentYear = new Date().getFullYear();
		return Array.from({ length: 100 }, (_, i) => ({
			label: String(currentYear - i),
			value: String(currentYear - i),
		}));
	}, []);

	const buildDynamicSchema = (
		educationArray: EducationEmploymentConfig[],
		employmentArray: EducationEmploymentConfig[],
	) => {
		const shape: Record<string, any> = {};

		// Education schema
		educationArray.forEach((group) => {
			shape[group.title] = Yup.object().shape({
				school: Yup.string().required("School is required"),
				degree: Yup.string().required("Degree is required"),
				startdate: Yup.string().required("Start date is required"),
				enddate: Yup.string().required("End date is required"),
			});
		});

		// Employment schema
		employmentArray.forEach((group) => {
			shape[group.title] = Yup.object().shape({
				company: Yup.string().required("Company is required"),
				position: Yup.string().required("Position is required"),
				startdate: Yup.string().required("Start date is required"),
				enddate: Yup.string().required("End date is required"),
			});
		});

		return Yup.object().required().shape(shape);
	};

	const validationSchema = useMemo(
		() =>
			staticSchema.concat(
				buildDynamicSchema(educationFields ?? [], employmentFields ?? []),
			),
		[educationFields, employmentFields],
	);

	useEffect(() => {
		setValidationSchemaOptions(validationSchema);
	}, [validationSchema]);

	const [validationSchemaOptions, setValidationSchemaOptions] =
		useState(validationSchema);

	const formik = useFormik({
		initialValues: { ...staticInitialValues, ...dynamicInitialValues },
		validationSchema: validationSchemaOptions,
		enableReinitialize: true,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const user: Omit<User, "id" | "createdAt" | "updatedAt"> = {
					firstName: values.firstName,
					...(values.middleName?.trim() && {
						middleName: values.middleName.trim(),
					}),
					lastName: values.lastName,
					gender: values.gender,
					contactNumber: values.contactNumber,
					email: values.email,
					birthDate: new Date(values.birthdate),
					facebookLink: values.facebook,
					userType: "Member",
					emergencyContactName: values.emergencyPerson,
					emergencyContactNumber: values.emergencyNumber,
				};

				// if (userId) {
				// 	await updateUser(userId, { ...user, updatedAt: now });
				// } else {
				await addUser({ ...user });
				// }
				onSuccess?.();
				navigation.goBack();
			} catch (err) {
				Alert.alert("Error", "Failed to save user");
				console.log(err);
			} finally {
				setLoading(false);
			}
		},
	});

	const addEducationField = useCallback(() => {
		const groupKey = `education${nextEduId}`;

		setEducationFields((prev) => [
			...prev,
			{
				title: groupKey,
				startYears: getYearsNowMinus99(),
			},
		]);

		formik.setFieldValue(groupKey, {
			school: "",
			degree: "",
			startdate: "",
			enddate: "",
		});

		formik.validateForm();
		setNextEduId((id) => id + 1);
	}, [nextEduId, formik, getYearsNowMinus99]);

	const addEmploymentField = useCallback(() => {
		const groupKey = `employment${nextEmpId}`;

		setEmploymentFields((prev) => [
			...prev,
			{
				title: groupKey,
				startYears: getYearsNowMinus99(),
			},
		]);

		formik.setFieldValue(groupKey, {
			company: "",
			position: "",
			startdate: "",
			enddate: "",
		});

		formik.validateForm();
		setNextEmpId((id) => id + 1);
	}, [nextEmpId, formik, getYearsNowMinus99]);

	const removeEducationField = useCallback(
		(groupKey: string) => {
			setEducationFields((prev) => prev.filter((g) => g.title !== groupKey));
			formik.setFieldValue(groupKey, undefined);
			formik.validateForm();
		},
		[formik],
	);

	const removeEmploymentField = useCallback(
		(groupKey: string) => {
			setEmploymentFields((prev) => prev.filter((g) => g.title !== groupKey));
			formik.setFieldValue(groupKey, undefined);
			formik.validateForm();
		},
		[formik],
	);

	const updateEducationEndYears = useCallback(
		(groupKey: string, startYearValue: string) => {
			setEducationFields((prev) => {
				if (!prev) return prev;

				return prev.map((field) => {
					if (field.title !== groupKey) return field;

					const start = Number(startYearValue);
					const currentYear = new Date().getFullYear();

					if (isNaN(start) || start > currentYear) {
						return { ...field, endYears: [] };
					}

					const years = Array.from(
						{ length: currentYear - start + 1 },
						(_, i) => ({
							label: String(start + i),
							value: String(start + i),
						}),
					);

					return { ...field, endYears: years };
				});
			});
		},
		[],
	);

	const updateEmploymentEndYears = useCallback(
		(groupKey: string, startYearValue: string) => {
			setEmploymentFields((prev) => {
				if (!prev) return prev;

				return prev.map((field) => {
					if (field.title !== groupKey) return field;

					const start = Number(startYearValue);
					const currentYear = new Date().getFullYear();

					if (isNaN(start) || start > currentYear) {
						return { ...field, endYears: [] };
					}

					const years = Array.from(
						{ length: currentYear - start + 1 },
						(_, i) => ({
							label: String(start + i),
							value: String(start + i),
						}),
					);

					return { ...field, endYears: years };
				});
			});
		},
		[],
	);

	// Load user if editing
	useEffect(() => {
		const load = async () => {
			if (!userId) return;
			setLoading(true);
			const user = await getUser(userId);
			if (user) {
				formik.setValues({
					firstName: user.firstName,
					middleName: user.middleName ?? "",
					lastName: user.lastName,
					birthdate: dayjs(user.birthdate).format("YYYY-MM-DD"),
					gender: user.gender,
					leaderId: user.dGroupLeaderId ? String(user.dGroupLeaderId) : "",
					contactNumber: user.contactNumber,
					email: user.email,
					facebook: user.facebookLink,
					emergencyPerson: user.emergencyContactName,
					emergencyNumber: user.emergencyContactNumber,
				});
			}
			setLoading(false);
		};
		load();
	}, [userId]);

	return {
		formik,
		loading,
		educationFields,
		employmentFields,
		addEducationField,
		removeEducationField,
		addEmploymentField,
		removeEmploymentField,
		updateEducationEndYears,
		updateEmploymentEndYears,
	};
};
