import { useEffect, useState } from "react";
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

export const useUserForm = ({ userId }: UseUserFormProps) => {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const { addUser, updateUser, getUser } = useUserViewModel();

	const formik = useFormik({
		initialValues: {
			firstName: "",
			middleName: "",
			lastName: "",
			birthdate: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("Required"),
			lastName: Yup.string().required("Required"),
			birthdate: Yup.date().nullable().required("Birthdate is required"),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const now = new Date();
				const user: Omit<User, "id" | "createdAt" | "updatedAt"> = {
					firstName: values.firstName,
					middleName: values.middleName,
					lastName: values.lastName,
					birthdate: new Date(),
				};

				if (userId) {
					await updateUser(userId, { ...user, updatedAt: now });
				} else {
					await addUser({ ...user });
				}

				navigation.goBack();
			} catch (err) {
				Alert.alert("Error", "Failed to save user");
			} finally {
				setLoading(false);
			}
		},
	});

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
				});
			}
			setLoading(false);
		};
		load();
	}, [userId]);

	return {
		formik,
		loading,
	};
};
