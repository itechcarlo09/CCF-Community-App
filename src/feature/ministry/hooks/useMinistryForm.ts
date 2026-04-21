import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateMinistryDTO, MinistryDTO } from "../model/Ministry";

interface UseMinistryFormProps {
	ministryId: number;
	onSuccess?: () => void;
}

const staticInitialValues = {
	name: "",
	mission: "",
	vision: "",
	description: "",
};

const staticSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
});

export const useMinistryForm = ({
	ministryId,
	onSuccess,
}: UseMinistryFormProps) => {
	const [loading, setLoading] = useState(false);
	const [ministry, setEvent] = useState<MinistryDTO | null>(null);
	// const { getUser } = useMinistryViewModel();
	const navigation = useNavigation();

	const formik = useFormik({
		initialValues: staticInitialValues,
		validationSchema: staticSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				if (ministryId) {
					const ministry: Partial<
						Omit<MinistryDTO, "id" | "createdAt" | "updatedAt">
					> = {
						...(values.name && { eventName: values.name }),
					};
					// await updateUser(userId.toString(), { ...user });
				} else {
					const ministry: Omit<
						CreateMinistryDTO,
						"id" | "createdAt" | "updatedAt"
					> = {
						name: values.name,
						mission: values.mission,
						vision: values.vision,
						description: values.description,
					};
					// await addUser({ ...user });
				}
				onSuccess && onSuccess();
			} catch (err) {
				Alert.alert(
					"Error",
					`Failed to ${ministryId && ministryId > 0 ? "update" : "add"} user`,
				);
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		const load = async () => {
			if (!ministryId) return;
			try {
				setLoading(true);
				// const ministry = await getUser(ministryId.toString());
				// if (ministry) {
				// 	setEvent({ ...ministry });
				// 	formik.setValues({
				// 		name: ministry.eventName,
				// 		mission: ministry.mission,
				// 		vision: ministry.vision,
				// 		description: ministry.description,
				// 	});
				// }
			} catch (err) {
				Alert.alert("Error", "Failed to fetch the user");
				navigation.goBack();
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [ministryId]);

	return {
		loading,
		ministry,
		formik,
	};
};
