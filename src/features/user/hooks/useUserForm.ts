import { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { UserDTO } from "../model/user";
import {
	formatPhoneNumber,
	normalizePHNumber,
} from "../../../utils/stringUtils";
import UserType from "../../../types/enums/UserType";

interface UseUserFormProps {
	userId?: number;
	onSuccess?: () => void;
}

// 🔽 Initial Values
const initialValues = {
	firstName: "",
	middleName: "",
	lastName: "",
	birthdate: "",
	gender: "",
	dLeaderID: "",
	contactNumber: "",
	email: "",
	facebook: "",
	emergencyPerson: "",
	emergencyNumber: "",
};

// 🔽 Validation
const validationSchema = Yup.object({
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required"),
	birthdate: Yup.date().required("Birthdate is required"),
	gender: Yup.string().required("Gender is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),

	contactNumber: Yup.string()
		.nullable()
		.notRequired()
		.matches(/^\d{3}-\d{3}-\d{4}$/, "Format: 999-999-9999")
		.test("starts-with-9", "Must start with 9", (value) => {
			if (!value) return true;
			return value.replace(/\D/g, "").startsWith("9");
		}),

	emergencyNumber: Yup.string()
		.nullable()
		.notRequired()
		.matches(/^\d{3}-\d{3}-\d{4}$/, "Format: 999-999-9999")
		.test("starts-with-9", "Must start with 9", (value) => {
			if (!value) return true;
			return value.replace(/\D/g, "").startsWith("9");
		}),
});

export const useUserForm = ({ userId, onSuccess }: UseUserFormProps) => {
	const navigation = useNavigation();
	const { addUser, updateUser, getUser } = useUserViewModel();

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<UserDTO | null>(null);

	// 🔽 Formik
	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,

		onSubmit: async (values) => {
			try {
				setLoading(true);

				if (userId) {
					// 🔽 UPDATE
					await updateUser(userId.toString(), {
						firstName: values.firstName,
						lastName: values.lastName,
						gender: values.gender,
						email: values.email,
						contactNumber: values.contactNumber,
						birthDate: new Date(values.birthdate),
						...(values.middleName && { middleName: values.middleName }),
						...(values.facebook && { facebookLink: values.facebook }),
						...(values.emergencyPerson && {
							emergencyContactName: values.emergencyPerson,
						}),
						...(values.emergencyNumber && {
							emergencyContactNumber: values.emergencyNumber,
						}),
						...(values.dLeaderID && {
							dGroupLeaderId: Number(values.dLeaderID),
						}),
					});
				} else {
					// 🔽 CREATE
					await addUser({
						firstName: values.firstName,
						lastName: values.lastName,
						gender: values.gender,
						email: values.email,
						contactNumber: values.contactNumber,
						birthDate: new Date(values.birthdate),

						userType:
							Object.keys(UserType).find(
								(key) => UserType[key as keyof typeof UserType] === "Member",
							) ?? Object.keys(UserType)[0],

						...(values.middleName && { middleName: values.middleName }),
						...(values.facebook && { facebookLink: values.facebook }),
						...(values.emergencyPerson && {
							emergencyContactName: values.emergencyPerson,
						}),
						...(values.emergencyNumber && {
							emergencyContactNumber: values.emergencyNumber,
						}),
						...(values.dLeaderID && {
							dGroupLeaderId: Number(values.dLeaderID),
						}),
					});
				}

				onSuccess?.();
			} catch (error) {
				Alert.alert("Error", `Failed to ${userId ? "update" : "create"} user`);
			} finally {
				setLoading(false);
			}
		},
	});

	// 🔽 Load user (Edit mode)
	useEffect(() => {
		if (!userId) return;

		const loadUser = async () => {
			try {
				setLoading(true);
				const data = await getUser(userId.toString());

				if (!data) return;

				setUser(data);

				formik.setValues({
					firstName: data.firstName,
					middleName: data.middleName ?? "",
					lastName: data.lastName,
					birthdate: dayjs(data.birthDate).format("YYYY-MM-DD"),
					gender: data.gender,
					dLeaderID: data.dGroupLeader?.id?.toString() ?? "",
					contactNumber: formatPhoneNumber(
						normalizePHNumber(data.contactNumber),
					),
					email: data.email,
					facebook: data.facebookLink ?? "",
					emergencyPerson: data.emergencyContactName ?? "",
					emergencyNumber: data.emergencyContactNumber
						? formatPhoneNumber(normalizePHNumber(data.emergencyContactNumber))
						: "",
				});
			} catch {
				Alert.alert("Error", "Failed to load user");
				navigation.goBack();
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, [userId]);

	// 🔽 Refresh (optional)
	const refreshUser = async () => {
		if (!userId) return;
		const data = await getUser(userId.toString());
		if (data) setUser(data);
	};

	return {
		formik,
		loading,
		user,
		refreshUser,
	};
};
