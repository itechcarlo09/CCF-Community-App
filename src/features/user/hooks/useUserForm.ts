import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserViewModel } from "../viewModel/useUserViewModel";
import { CreateAccountBasicInfoDTO, UserDTO, Gender } from "../model/user";
import { useAccountQuery } from "./useAccountQuery";
import EducationLevel from "src/types/enums/EducationLevel";
import { CreateEducationDTO } from "../model/Education";
import UserType from "src/types/enums/UserType";

interface UseUserFormProps {
	userId?: number;
	onSuccess?: () => void;
}

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
	education: [] as CreateEducationDTO[],
};

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
		.test(
			"starts-with-9",
			"Must start with 9",
			(value) => !value || value.replace(/\D/g, "").startsWith("9"),
		),
	emergencyNumber: Yup.string()
		.nullable()
		.notRequired()
		.matches(/^\d{3}-\d{3}-\d{4}$/, "Format: 999-999-9999")
		.test(
			"starts-with-9",
			"Must start with 9",
			(value) => !value || value.replace(/\D/g, "").startsWith("9"),
		),
});

export const useUserForm = ({ userId, onSuccess }: UseUserFormProps) => {
	const queryClient = useQueryClient();
	const { addUser, updateUser } = useUserViewModel();
	const { data: user, isLoading, refetch } = useAccountQuery(userId);

	// 🔹 ADD USER MUTATION
	const addUserMutation = useMutation<
		UserDTO,
		Error,
		CreateAccountBasicInfoDTO
	>({
		mutationFn: async (data) => {
			const result = await addUser(data);
			if (!result) throw new Error("Failed to create user");
			return result;
		},
		onSuccess: (newUser) => {
			queryClient.setQueryData(["user", newUser.id], newUser);
			onSuccess?.();
		},
		onError: (error: any) => {
			const data = error?.response?.data;

			alert(data?.message ?? "Request failed");
		},
	});

	// 🔹 UPDATE USER MUTATION
	const updateUserMutation = useMutation<
		void,
		Error,
		{ id: number; data: Partial<CreateAccountBasicInfoDTO> }
	>({
		mutationFn: ({ id, data }) => updateUser(id, data),
		onSuccess: async () => {
			if (userId) {
				await queryClient.invalidateQueries({ queryKey: ["user", userId] });
			}
			onSuccess?.();
		},
	});

	// 🔹 FORM
	const formik = useFormik({
		initialValues,
		validationSchema,
		enableReinitialize: true,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: async (values) => {
			const payload: Partial<CreateAccountBasicInfoDTO> = {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				gender: values.gender as Gender,
				userType: UserType.Member,
				birthDate: dayjs(values.birthdate).toDate(),
				...(values.middleName && { middleName: values.middleName }),
				...(values.nickname && { nickName: values.nickname }),
				...(values.profilePicture && {
					profilePicture: values.profilePicture,
				}),
				...(values.contactNumber && { contactNumber: values.contactNumber }),
				...(values.facebook && { facebookLink: values.facebook }),
				...(values.emergencyPerson && {
					emergencyContactName: values.emergencyPerson,
				}),
				...(values.emergencyNumber && {
					emergencyContactNumber: values.emergencyNumber,
				}),
			};
			if (userId) {
				await updateUserMutation.mutateAsync({ id: userId, data: payload });
			} else {
				await addUserMutation.mutateAsync(payload as CreateAccountBasicInfoDTO);
			}
		},
	});

	// 🔹 LOAD USER
	useEffect(() => {
		if (!user) return;

		const loadUser = () => {
			formik.setValues({
				firstName: user.firstName || "",
				middleName: user.middleName || "",
				lastName: user.lastName || "",
				nickname: user.nickname || "",
				profilePicture: user.profilePicture || "",
				birthdate: user.birthDate
					? dayjs(user.birthDate).format("YYYY-MM-DD")
					: "",
				gender: user.gender || "",
				contactNumber: user.contactNumber || "",
				email: user.email || "",
				facebook: user.facebookLink || "",
				emergencyPerson: user.emergencyContactName || "",
				emergencyNumber: user.emergencyContactNumber || "",
				education: user.education.map((edu) => {
					return {
						schoolId: edu.school.id,
						educationLevel: edu.educationLevel as EducationLevel,
						course: edu.course,
						startDate: edu.startDate,
						endDate: edu.endDate ?? null,
					};
				}),
			});
		};

		loadUser();
	}, [user]);

	return {
		formik,
		isLoading,
		user,
		refreshUser: refetch,
	};
};
