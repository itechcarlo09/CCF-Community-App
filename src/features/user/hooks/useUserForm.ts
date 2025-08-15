import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { User } from "../model/user";

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
	// email: Yup.string()
	// 	.email("Please enter a valid email address")
	// 	.required("Email is required"),
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

const buildDynamicSchema = (fieldsArray: any[]) => {
	const shape: Record<string, any> = {};
	fieldsArray.forEach((group) => {
		const key = Object.keys(group)[0];
		const fields = group[key];
		const groupShape: Record<string, any> = {};
		Object.entries(fields).forEach(([name, config]: any) => {
			let validator =
				config.type === "number"
					? Yup.number().typeError("Must be a number")
					: Yup.string();
			validator = validator.required(`${config.label} is required`);
			groupShape[name] = validator;
		});
		shape[key] = Yup.object().shape(groupShape);
	});
	return Yup.object().shape(shape);
};

export const useUserForm = ({ userId }: UseUserFormProps) => {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { addUser } = useUserViewModel();
	const [dynamicFields, setDynamicFields] = useState<any[]>();
	const [nextId, setNextId] = useState(1);

	const getYearsNowMinus99 = useCallback(() => {
		const currentYear = new Date().getFullYear();
		return Array.from({ length: 100 }, (_, i) => ({
			label: String(currentYear - i),
			value: String(currentYear - i),
		}));
	}, []);

	const addDynamicField = useCallback(() => {
		const groupKey = `education${nextId}`;
		setDynamicFields((prev) => [
			...(prev || []),
			{
				title: groupKey,
				startYears: getYearsNowMinus99(),
			},
		]);
		setNextId((id) => id + 1); // increment for next add
	}, [nextId]);

	const removeDynamicField = useCallback((groupKey: string) => {
		setDynamicFields((prev) => prev?.filter((group) => !group[groupKey]));
	}, []);

	const validationSchema = useMemo(
		() => staticSchema.concat(buildDynamicSchema(dynamicFields ?? [])),
		[dynamicFields]
	);

	const formik = useFormik({
		initialValues: staticInitialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const user: Omit<User, "id" | "createdAt" | "updatedAt"> = {
					firstName: values.firstName,
					middleName: values.middleName,
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

				navigation.goBack();
			} catch (err) {
				Alert.alert("Error", "Failed to save user");
				console.log(err);
			} finally {
				setLoading(false);
			}
		},
	});

	const updateEndYears = useCallback(
		(groupKey: string, startYearValue: string) => {
			setDynamicFields((prev) => {
				if (!prev) return prev;

				return prev.map((field) => {
					if (field.title !== groupKey) return field;

					const currentYear = new Date().getFullYear();
					const start = Number(startYearValue);

					const years = Array.from(
						{ length: currentYear - start + 1 },
						(_, i) => ({
							label: String(start + i),
							value: String(start + i),
						})
					);

					return { ...field, endYears: years };
				});
			});
		},
		[]
	);

	console.log("Dynamic Fields: ", dynamicFields);

	// Load user if editing
	useEffect(() => {
		const load = async () => {
			if (!userId) return;
			setLoading(true);
			// const user = await getUser(userId);
			// if (user) {
			// 	formik.setValues({
			// 		firstName: user.firstName,
			// 		middleName: user.middleName ?? "",
			// 		lastName: user.lastName,
			// 		birthdate: dayjs(user.birthdate).format("YYYY-MM-DD"),
			// 	});
			// }
			setLoading(false);
		};
		load();
	}, [userId]);

	return {
		formik,
		loading,
		dynamicFields,
		updateEndYears,
		addDynamicField,
		removeDynamicField,
	};
};
