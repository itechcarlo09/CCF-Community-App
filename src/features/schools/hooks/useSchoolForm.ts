import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SchoolDTO, CreateSchoolDTO } from "../model/School";
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
	const [loading, setLoading] = useState(false);
	const [school, setSchool] = useState<SchoolDTO | null>(null);
	const { getSchool, addSchool, updateSchool } = useSchoolViewModel();
	const navigation = useNavigation();

	const formik = useFormik({
		initialValues: staticInitialValues,
		validationSchema: staticSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				if (schoolId && schoolId > 0) {
					const payload: Partial<CreateSchoolDTO> = {};

					if (values.name) payload.name = values.name;
					payload.acronym = values.acronym?.trim() ? values.acronym : null;
					if (values.address) payload.address = values.address;

					await updateSchool(schoolId, payload);
				} else {
					// Create new school
					const newSchool: CreateSchoolDTO = {
						name: values.name,
						acronym: values.acronym,
						address: values.address,
					};
					await addSchool(newSchool);
				}

				onSuccess && onSuccess();
			} catch (err) {
				Alert.alert(
					"Error",
					`Failed to ${schoolId && schoolId > 0 ? "update" : "add"} school`,
				);
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		const load = async () => {
			if (!schoolId) return;
			console.log("Loading school with ID:", schoolId);
			try {
				setLoading(true);
				const school = await getSchool(schoolId);
				if (school) {
					setSchool({ ...school });
					formik.setValues({
						name: school.name,
						acronym: school.acronym ?? "",
						address: school.address,
					});
				}
			} catch (err) {
				navigation.goBack();
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [schoolId]);

	return {
		loading,
		school,
		formik,
	};
};
