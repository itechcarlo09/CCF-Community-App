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
	date: "", // YYYY-MM-DD
	time: "", // HH:mm
	location: "",
	seriesId: "",
	ministries: [] as {
		ministryId: string;
		role: "Organizer" | "Co-organizer" | "Partner";
	}[],
};

const staticSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	location: Yup.string().required("Required"),
	date: Yup.string().required("Required"),
	time: Yup.string().required("Required"),
	ministries: Yup.array()
		.of(
			Yup.object().shape({
				ministryId: Yup.string().required(),
				role: Yup.mixed<"Organizer" | "Co-organizer" | "Partner">()
					.oneOf(["Organizer", "Co-organizer", "Partner"])
					.required(),
			}),
		)
		.test("single-organizer", function (ministries) {
			if (!ministries) return true;
			const organizerIndexes = ministries
				.map((m, i) => (m.role === "Organizer" ? i : -1))
				.filter((i) => i !== -1);

			if (organizerIndexes.length <= 1) return true;

			// Set error on all ministries that are "Organizer" except the first one
			organizerIndexes.slice(1).forEach((i) => {
				this.createError({
					path: `ministries[${i}].role`,
					message: "Only one ministry can be Organizer",
				});
			});

			return organizerIndexes.length <= 1; // still return boolean for Yup
		}),
});

export const useEventForm = ({ eventId, onSuccess }: UseEventFormProps) => {
	const [loading, setLoading] = useState(false);
	const [event, setEvent] = useState<EventDTO | null>(null);
	const { getEvent, addEvent, updateEvent } = useEventViewModel();
	const navigation = useNavigation();

	const formik = useFormik({
		initialValues: staticInitialValues,
		validationSchema: staticSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				// Combine date + time into a single Date object
				const combinedDate = dayjs(
					`${values.date} ${values.time}`,
					"YYYY-MM-DD HH:mm",
				).toDate();

				if (eventId && eventId > 0) {
					// Update existing event
					const updatedEvent: Partial<
						Omit<EventDTO, "id" | "createdAt" | "updatedAt">
					> = {
						eventName: values.name,
						eventDate: combinedDate,
						location: values.location,
					};
					await updateEvent(eventId.toString(), updatedEvent);
				} else {
					// Create new event
					const newEvent: Omit<
						CreateEventDTO,
						"id" | "createdAt" | "updatedAt"
					> = {
						eventName: values.name,
						eventDate: combinedDate,
						location: values.location,
						seriesId: 1,
						ministryId: 1,
					};
					await addEvent(newEvent);
				}

				onSuccess && onSuccess();
			} catch (err) {
				Alert.alert(
					"Error",
					`Failed to ${eventId && eventId > 0 ? "update" : "add"} event`,
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
				const event = await getEvent(eventId.toString());
				if (event) {
					setEvent({ ...event });
					formik.setValues({
						name: event.eventName,
						date: dayjs(event.eventDate).format("YYYY-MM-DD"),
						time: dayjs(event.eventDate).format("HH:mm"),
						location: event.location,
						seriesId: event.series?.id ? event.series.id.toString() : "",
						ministries: [],
					});
				}
			} catch (err) {
				Alert.alert("Error", "Failed to fetch the event");
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
