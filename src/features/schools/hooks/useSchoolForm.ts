import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { SchoolDTO, CreateSchoolDTO } from "../model/School";
import { schoolRepository } from "../data/schoolRepository";
import { useSchoolViewModel } from "../viewModel/useSchoolViewModel";

interface UseSchoolFormProps {
	schoolId?: number;
	onSuccess?: () => void;
}

const staticInitialValues = {
	name: "",
	acronym: "",
	address: "",
};

const staticSchema = Yup.object().shape({
	name: Yup.string().required("School name is required"),
	address: Yup.string().required("Address is required"),
});

export const useSchoolForm = ({ schoolId, onSuccess }: UseSchoolFormProps) => {
	const navigation = useNavigation();
	const queryClient = useQueryClient();

	const { addSchool, updateSchool } = useSchoolViewModel();

	// ✅ Fetch school (EDIT mode)
	const { data: school, isLoading: isFetching } = useQuery<SchoolDTO | null>({
		queryKey: ["school", schoolId],
		queryFn: () => schoolRepository.getSchoolById?.(schoolId!),
		enabled: !!schoolId,
		staleTime: 1000 * 60 * 5,
	});

	// ✅ Mutation (CREATE / UPDATE)
	const mutation = useMutation({
		mutationFn: async (values: typeof staticInitialValues) => {
			if (schoolId && schoolId > 0) {
				return updateSchool(schoolId, {
					name: values.name,
					acronym: values.acronym?.trim() ? values.acronym : null,
					address: values.address,
				});
			}

			return addSchool({
				name: values.name,
				acronym: values.acronym,
				address: values.address,
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["schools"] });
			queryClient.invalidateQueries({ queryKey: ["school", schoolId] });

			onSuccess?.();
			navigation.goBack(); // ✅ usually expected UX
		},

		onError: () => {
			Alert.alert("Error", `Failed to ${schoolId ? "update" : "add"} school`);
		},
	});

	// ✅ Derive initial values safely
	const initialValues = school
		? {
				name: school.name,
				acronym: school.acronym ?? "",
				address: school.address,
		  }
		: staticInitialValues;

	// ✅ Formik
	const formik = useFormik({
		initialValues,
		validationSchema: staticSchema,
		enableReinitialize: true,

		onSubmit: async (values) => {
			await mutation.mutateAsync(values);
		},
	});

	return {
		loading: isFetching || mutation.isPending,
		school,
		formik,
	};
};
