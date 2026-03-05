import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { DGroupBasicInfo, Education, Employment, User } from "../model/user";
import { EducationEmploymentConfig } from "../../../types/userTypes";
import {
	formatFullName,
	formatPhoneNumber,
	normalizePHNumber,
} from "../../../utils/stringUtils";

interface UseUserFormProps {
	userId: number;
	onSuccess?: () => void;
}

const staticInitialValues = {
	firstName: "",
	middleName: "",
	lastName: "",
	birthdate: "",
	gender: "",
	leaderName: "",
	dLeaderID: "",
	contactNumber: "",
	email: "",
	facebook: "",
	emergencyPerson: "",
	emergencyNumber: "",
	education: [] as Education[],
	employment: [] as Employment[],
};

const staticSchema = Yup.object({
	firstName: Yup.string().required("Please enter a valid first name"),
	lastName: Yup.string().required("Please enter a valid last name"),
	birthdate: Yup.date().required("Birthdate is required"),
	gender: Yup.string().required("Please select a gender"),
	contactNumber: Yup.string()
		.nullable()
		.notRequired()
		.test("starts-with-9", "Contact number must start with 9", (value) => {
			if (!value || value.trim() === "") return true;
			const digitsOnly = value.replace(/\D/g, "");
			return digitsOnly.startsWith("9");
		})
		.test(
			"length-check",
			"Contact number must have exactly 10 digits",
			(value) => {
				if (!value || value.trim() === "") return true;
				const digitsOnly = value.replace(/\D/g, "");
				return digitsOnly.length === 10;
			},
		)
		.test(
			"dash-format",
			"Contact number must be in the format 999-999-9999",
			(value) => {
				if (!value || value.trim() === "") return true;
				return /^\d{3}-\d{3}-\d{4}$/.test(value);
			},
		),
	email: Yup.string()
		.email("Please enter a valid email address")
		.required("Email is required"),
	emergencyNumber: Yup.string()
		.nullable()
		.notRequired()
		.test("starts-with-9", "Contact number must start with 9", (value) => {
			if (!value || value.trim() === "") return true;
			const digitsOnly = value.replace(/\D/g, "");
			return digitsOnly.startsWith("9");
		})
		.test(
			"length-check",
			"Contact number must have exactly 10 digits",
			(value) => {
				if (!value || value.trim() === "") return true;
				const digitsOnly = value.replace(/\D/g, "");
				return digitsOnly.length === 10;
			},
		)
		.test(
			"dash-format",
			"Contact number must be in the format 999-999-9999",
			(value) => {
				if (!value || value.trim() === "") return true;
				return /^\d{3}-\d{3}-\d{4}$/.test(value);
			},
		),
});

export const useUserForm = ({ userId, onSuccess }: UseUserFormProps) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const dynamicInitialValues: Record<string, EducationEmploymentConfig> = {};
	const navigation = useNavigation();
	const { addUser, getUser, updateUser } = useUserViewModel();

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
					dGroupLeaderId: values.dLeaderID ? Number(values.dLeaderID) : null,
					education: values.education.length > 0 ? values.education : [],
					employment: values.employment.length > 0 ? values.employment : [],
				};

				if (userId) {
					await updateUser(userId.toString(), { ...user });
				} else {
					await addUser({ ...user });
				}
				onSuccess && onSuccess();
			} catch (err) {
				Alert.alert(
					"Error",
					`Failed to ${userId && userId > 0 ? "update" : "add"} user`,
				);
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

	const refreshUser = useCallback(async () => {
		try {
			setLoading(true);
			const user = await getUser(userId.toString());
			if (user) {
				setUser({ ...user });
			}
		} finally {
			setLoading(false);
		}
	}, []);

	// Load user if editing
	useEffect(() => {
		const load = async () => {
			if (!userId) return;
			try {
				setLoading(true);
				const user = await getUser(userId.toString());
				if (user) {
					console.log(user);
					setUser({ ...user });
					formik.setValues({
						firstName: user.firstName,
						middleName: user.middleName ?? "",
						lastName: user.lastName,
						birthdate: dayjs(user.birthDate).format("YYYY-MM-DD"),
						gender: user.gender,
						leaderName: user.dGroupLeader
							? formatFullName(
									user.dGroupLeader.firstName,
									user.dGroupLeader.lastName,
									user.dGroupLeader.middleName,
							  ) ?? ""
							: "",
						contactNumber: formatPhoneNumber(
							normalizePHNumber(user.contactNumber),
						),
						email: user.email,
						facebook: user.facebookLink,
						emergencyPerson: user.emergencyContactName,
						emergencyNumber: user.emergencyContactNumber
							? formatPhoneNumber(
									normalizePHNumber(user.emergencyContactNumber),
							  )
							: "",
						dLeaderID: user.dGroupLeader
							? user.dGroupLeader?.id.toString()
							: "",
						education: user.education.length > 0 ? user.education : [],
						employment: user.employment.length > 0 ? user.employment : [],
					});
				}
			} catch (err) {
				Alert.alert("Error", "Failed to fetch the user");
				navigation.goBack();
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [userId]);

	return {
		formik,
		loading,
		user,
		refreshUser,
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
