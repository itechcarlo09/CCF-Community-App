import { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { CreateAccountBasicInfoDTO, UserDTO } from "../model/user";
import {
	formatFullName,
	formatPhoneNumber,
	normalizePHNumber,
} from "../../../utils/stringUtils";
import UserType from "../../../types/enums/UserType";
import topUsers from "../topUsers.json";
import { Gender } from "src/types/enums/Gender";

interface UseUserFormProps {
	userId?: number;
	onSuccess?: () => void;
}

// 🔽 Initial Values
const initialValues = {
	firstName: "",
	middleName: "",
	lastName: "",
	nickname: "",
	profilePicture: "",
	birthdate: "",
	gender: "",
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

	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		validateOnBlur: true,
		validateOnChange: false,

		onSubmit: async (values) => {
			try {
				setLoading(true);
				if (userId) {
					const payload: Partial<CreateAccountBasicInfoDTO> = {};

					if (values.firstName) payload.firstName = values.firstName;
					if (values.middleName) payload.middleName = values.middleName;
					if (values.lastName) payload.lastName = values.lastName;
					if (values.nickname) payload.nickName = values.nickname;
					if (values.profilePicture)
						payload.profilePicture = values.profilePicture;
					if (values.facebook) payload.facebookLink = values.facebook;
					if (values.contactNumber)
						payload.contactNumber = values.contactNumber;
					if (values.email) payload.email = values.email;
					if (values.gender) payload.gender = values.gender as Gender;
					if (values.birthdate)
						payload.birthDate = dayjs(values.birthdate).toDate();
					if (values.emergencyPerson)
						payload.emergencyContactName = values.emergencyPerson;
					if (values.emergencyNumber)
						payload.emergencyContactNumber = values.emergencyNumber;

					await updateUser(userId, payload);
				} else {
					await addUser({
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
						gender: values.gender as Gender,
						birthDate: new Date(values.birthdate),
						userType: UserType.Member,

						...(values.middleName && { middleName: values.middleName }),
						...(values.nickname && { nickName: values.nickname }),
						...(values.profilePicture && {
							profilePicture: values.profilePicture,
						}),
						...(values.contactNumber && {
							contactNumber: values.contactNumber,
						}),
						...(values.facebook && { facebookLink: values.facebook }),
						...(values.emergencyPerson && {
							emergencyContactName: values.emergencyPerson,
						}),
						...(values.emergencyNumber && {
							emergencyContactNumber: values.emergencyNumber,
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
				const topUser = topUsers.find(
					(topUser) => topUser.email === data.email,
				);

				formik.setValues({
					firstName: data.firstName || "",
					middleName: data.middleName || "",
					lastName: data.lastName || "",
					nickname: data.nickname || "",
					profilePicture: data.profilePicture || "",
					birthdate: data.birthDate
						? dayjs(data.birthDate).format("YYYY-MM-DD")
						: "",
					gender: data.gender || "",
					contactNumber: data.contactNumber || "",
					email: data.email || "",
					facebook: data.facebookLink || "",
					emergencyPerson: data.emergencyContactName || "",
					emergencyNumber: data.emergencyContactNumber || "",
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
