import React, { useMemo, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Platform,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useEventForm } from "../hooks/userEventForm";
import { NOID } from "src/types/globalTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventStackParamList, UserStackParamList } from "src/types/navigation";
import Input from "@components/Inputs";
import Loading from "@components/Loading";
import { formatDateForDisplay } from "src/utils/dateFormatter";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface EventFormValues {
	name: string;
	date: string;
	location: string;
	seriesId?: string;
	ministryId: string;
}

interface Props {
	initialData?: Partial<EventFormValues>;
	onSubmit: (values: EventFormValues) => void;
	onCancel?: () => void;
	seriesOptions: { label: string; value: string }[];
	ministryOptions: { label: string; value: string }[];
}

type UserRouteProp = RouteProp<EventStackParamList, "EventForm">;
type NavProp = NativeStackNavigationProp<EventStackParamList>;

export const seriesOptions = [
	{ label: "Faith Foundations", value: "series_faith_foundations" },
	{ label: "Purpose Driven Life", value: "series_purpose_driven" },
	{ label: "Relationships & Love", value: "series_relationships" },
	{ label: "Leadership 101", value: "series_leadership_101" },
	{ label: "Spiritual Growth", value: "series_spiritual_growth" },
];

export const ministryOptions = [
	{ label: "Youth Ministry", value: "ministry_youth" },
	{ label: "Singles Ministry", value: "ministry_singles" },
	{ label: "Couples Ministry", value: "ministry_couples" },
	{ label: "Music Ministry", value: "ministry_music" },
	{ label: "Kids Ministry", value: "ministry_kids" },
	{ label: "Outreach Ministry", value: "ministry_outreach" },
];

const CreateEventScreen: React.FC<Props> = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id, onSuccess } = route.params || {};
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { formik, loading } = useEventForm({
		eventId: id ? id : NOID,
		onSuccess: () => {
			if (onSuccess) onSuccess();
			navigation.goBack();
		},
	});

	// const renderError = (field: keyof EventFormValues) => {
	// 	if (formik.touched[field] && formik.errors[field]) {
	// 		return <Text style={styles.error}>{formik.errors[field]}</Text>;
	// 	}
	// 	return null;
	// };

	const handleDateChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date,
	) => {
		if (Platform.OS === "android") {
			setShowDatePicker(false);
		}

		if (event.type === "dismissed") return;

		if (selectedDate) {
			formik.setFieldValue("date", selectedDate);
		}
	};

	if (loading) return <Loading />;

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={styles.container}
		>
			<Text style={styles.title}>{id ? "Edit Event" : "Create Event"}</Text>

			<Text style={styles.section}>Basic Information</Text>
			<Input
				label="Event Name"
				placeholder="Enter Event Name"
				value={formik.values.name}
				onChangeText={formik.handleChange("name")}
				onBlur={() => formik.setFieldTouched("name")}
				error={formik.touched.name ? formik.errors.name : undefined}
				required
			/>

			{/* Event Date */}
			<View style={{ marginBottom: 12 }}>
				<View style={styles.labelRow}>
					<Text style={styles.label}>Event Date</Text>
					<Text style={styles.required}> *</Text>
				</View>

				<TouchableOpacity
					style={styles.birthDateTouchable}
					onPress={() => setShowDatePicker(true)}
				>
					<Text
						style={{
							color: formik.values.date ? "#111827" : "#9CA3AF",
						}}
					>
						{formik.values.date
							? formatDateForDisplay(formik.values.date)
							: "Select Event Date"}
					</Text>
				</TouchableOpacity>

				{formik.touched.date && formik.errors.date && (
					<Text style={styles.errorText}>{formik.errors.date}</Text>
				)}
			</View>

			{showDatePicker && (
				<DateTimePicker
					value={formik.values.date ? new Date(formik.values.date) : new Date()}
					mode="date"
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={handleDateChange}
				/>
			)}

			<Input
				label="Location"
				placeholder="Enter Location"
				value={formik.values.location}
				onChangeText={formik.handleChange("location")}
				onBlur={() => formik.setFieldTouched("location")}
				error={formik.touched.location ? formik.errors.location : undefined}
				required
			/>

			{/* Series (Optional) */}
			{seriesOptions && (
				<View style={styles.field}>
					<Text style={styles.label}>Series (Optional)</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{seriesOptions.map((item) => {
							const isSelected = formik.values.seriesId === item.value;
							return (
								<TouchableOpacity
									key={item.value}
									style={[styles.chip, isSelected && styles.chipSelected]}
									onPress={() =>
										formik.setFieldValue(
											"seriesId",
											isSelected ? undefined : item.value,
										)
									}
								>
									<Text
										style={[
											styles.chipText,
											isSelected && styles.chipTextSelected,
										]}
									>
										{item.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			)}

			{/* Ministry */}
			{ministryOptions && (
				<View style={styles.field}>
					<Text style={styles.label}>Ministry</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{ministryOptions.map((item) => {
							const isSelected = formik.values.ministryId === item.value;
							return (
								<TouchableOpacity
									key={item.value}
									style={[styles.chip, isSelected && styles.chipSelected]}
									onPress={() => formik.setFieldValue("ministryId", item.value)}
								>
									<Text
										style={[
											styles.chipText,
											isSelected && styles.chipTextSelected,
										]}
									>
										{item.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			)}

			{/* SUBMIT */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>
					{id ? "Update Event" : "Create Event"}
				</Text>
			</TouchableOpacity>
		</KeyboardAwareScrollView>
	);
};

export default CreateEventScreen;

const styles = StyleSheet.create({
	section: {
		fontSize: 16,
		fontWeight: "600",
		marginTop: 16,
		marginBottom: 8,
		color: "#374151",
	},
	submitButton: {
		backgroundColor: "#4F46E5",
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 24,
	},
	labelRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 16,
		color: "#111827",
	},
	container: {
		padding: 16,
		paddingBottom: 32,
	},
	field: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		marginBottom: 6,
		fontWeight: "600",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 14,
	},
	error: {
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
	errorText: { color: "#DC2626", fontSize: 12, marginTop: 4 },
	chip: {
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 8,
	},
	chipSelected: {
		backgroundColor: "#007bff",
		borderColor: "#007bff",
	},
	chipText: {
		fontSize: 13,
	},
	chipTextSelected: {
		color: "#fff",
		fontWeight: "600",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 24,
	},
	cancelBtn: {
		padding: 12,
	},
	cancelText: {
		color: "#666",
	},
	submitBtn: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		backgroundColor: "#007bff",
	},
	submitText: {
		color: "#fff",
		fontWeight: "600",
	},
	required: {
		color: "#EF4444",
		fontSize: 14,
		fontWeight: "600",
	},
	birthDateTouchable: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		padding: 12,
		justifyContent: "center",
		marginBottom: 12,
		backgroundColor: "#FFFFFF",
	},
});
