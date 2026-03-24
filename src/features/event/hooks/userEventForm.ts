import { useEffect, useState } from "react";
import { CreateEventDTO, EventDTO } from "../model/Event";
import { useEventViewModel } from "../viewModel/useEventViewModel";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

interface UseEventFormProps {
	eventId: number;
	onSuccess?: () => void;
}

const staticInitialValues = {
	name: "",
	date: "",
};

const staticSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
});

export const useEventForm = ({ eventId, onSuccess }: UseEventFormProps) => {
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState<EventDTO | null>(null);
	const { getUser } = useEventViewModel();
	const navigation = useNavigation();

	const formik = useFormik({
		initialValues: staticInitialValues,
		validationSchema: staticSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				if (eventId) {
					const event: Partial<
						Omit<EventDTO, "id" | "createdAt" | "updatedAt">
					> = {
						...(values.name && { eventName: values.name }),
					};
					// await updateUser(userId.toString(), { ...user });
				} else {
					const event: Omit<CreateEventDTO, "id" | "createdAt" | "updatedAt"> =
						{
							eventName: values.name,
							eventDate: new Date(values.date),
							location: "",
							seriesId: 0,
							ministryId: 0,
						};
					// await addUser({ ...user });
				}
				onSuccess && onSuccess();
			} catch (err) {
				Alert.alert(
					"Error",
					`Failed to ${eventId && eventId > 0 ? "update" : "add"} user`,
				);
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		const load = async () => {
			if (!eventId) return;
			try {
				setLoading(true);
				const event = await getUser(eventId.toString());
				if (event) {
					setEvent({ ...event });
					formik.setValues({
						name: event.eventName,
						date: dayjs(event.eventDate).format("YYYY-MM-DD"),
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
	}, [eventId]);

	return {
		loading,
		event,
		formik,
	};
};
