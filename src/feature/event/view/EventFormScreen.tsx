import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Platform,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import Input from "@components/Inputs";
import Loading from "@components/Loading";
import { useEventForm } from "../hooks/userEventForm";
import { NOID } from "src/types/globalTypes";
import { EventStackParamList } from "src/types/navigation";
import { roles } from "src/types/enums/UserType";
import { formatDateForDisplay } from "src/utils/dateFormatter";
import { useTheme } from "@theme/ThemeProvider";
import { useMinistryViewModel } from "src/feature/ministry/viewModel/useMinistryViewModel";

interface EventFormValues {
	name: string;
	date: Date | null;
	time: Date | null;
	location: string;
	seriesId?: string;
	ministries: {
		ministryId: string;
		role: "Organizer" | "Co-organizer" | "Partner";
	}[];
}

type UserRouteProp = RouteProp<EventStackParamList, "EventForm">;
type NavProp = NativeStackNavigationProp<EventStackParamList>;

const ministryOptions = [
	{ label: "Youth Ministry", value: "ministry_youth" },
	{ label: "Singles Ministry", value: "ministry_singles" },
	{ label: "Couples Ministry", value: "ministry_couples" },
	{ label: "Music Ministry", value: "ministry_music" },
	{ label: "Kids Ministry", value: "ministry_kids" },
	{ label: "Outreach Ministry", value: "ministry_outreach" },
];

const CreateEventScreen: React.FC = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { theme } = useTheme();
	const { id, onSuccess } = route.params || {};
	const { ministries } = useMinistryViewModel();
	const ministryOptions = ministries.map((m) => ({
		label: m.name,
		value: m.id,
	}));

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [seriesName, setSeriesName] = useState("");

	const { formik, loading } = useEventForm({
		eventId: id ? id : NOID,
		onSuccess: () => {
			if (onSuccess) onSuccess();
			navigation.goBack();
		},
	});

	const handleDateChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date,
	) => {
		if (Platform.OS === "android") setShowDatePicker(false);
		if (event.type === "dismissed") return;
		if (selectedDate) formik.setFieldValue("date", selectedDate);
	};

	const handleTimeChange = (
		event: DateTimePickerEvent,
		selectedTime?: Date,
	) => {
		if (Platform.OS === "android") setShowTimePicker(false);
		if (event.type === "dismissed") return;
		if (selectedTime) formik.setFieldValue("time", selectedTime);
	};

	const handleAssignSeries = useCallback(() => {
		const parsedId = Number(id);
		const safeId = !isNaN(parsedId) ? parsedId : NOID;
		// navigation.navigate("DleaderScreen", {
		// 	id: safeId,
		// 	gender,
		// 	onSelect: (selectedId: number, fullName: string) => {
		// 		 formik.setFieldValue("dLeaderID", selectedId);
		// 		  formik.setFieldValue("dLeaderName", fullName);
		// 		 },
		// 		 });
	}, [id, navigation, formik]);

	if (loading) return <Loading />;

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={styles.container}
		>
			<Text style={styles.title}>{`${id ? "Edit" : "Create"} Event`}</Text>
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
					<Text style={styles.required}>*</Text>
				</View>
				<TouchableOpacity
					style={[
						styles.birthDateTouchable,
						{
							borderColor:
								formik.touched.date && formik.errors.date
									? "#DC2626"
									: "#D1D5DB",
						},
					]}
					onPress={() => setShowDatePicker(true)}
				>
					<Text style={{ color: formik.values.date ? "#111827" : "#9CA3AF" }}>
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
					value={formik.values.date || new Date()}
					mode="date"
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={handleDateChange}
				/>
			)}
			{/* Event Time */}
			<View style={{ marginBottom: 12 }}>
				<View style={styles.labelRow}>
					<Text style={styles.label}>Event Time</Text>
					<Text style={styles.required}>*</Text>
				</View>
				<TouchableOpacity
					style={[
						styles.birthDateTouchable,
						{
							borderColor:
								formik.touched.time && formik.errors.time
									? "#DC2626"
									: "#D1D5DB",
						},
					]}
					onPress={() => setShowTimePicker(true)}
				>
					<Text style={{ color: formik.values.time ? "#111827" : "#9CA3AF" }}>
						{formik.values.time
							? dayjs(formik.values.time).format("hh:mm A")
							: "Select Event Time"}
					</Text>
				</TouchableOpacity>
				{formik.touched.time && formik.errors.time && (
					<Text style={styles.errorText}>{formik.errors.time}</Text>
				)}
			</View>
			{showTimePicker && (
				<DateTimePicker
					value={formik.values.time || new Date()}
					mode="time"
					is24Hour={false}
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={handleTimeChange}
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
			{/* SERIES */}
			<Text style={styles.label}>Series</Text>
			<TouchableOpacity
				style={styles.seriesButton}
				onPress={handleAssignSeries}
			>
				<Text style={styles.seriesButtonText}>
					{seriesName ? `${seriesName}` : "Select Series"}
				</Text>
			</TouchableOpacity>
			{/* Ministry Selection Component */}
			<View style={styles.field}>
				<Text style={styles.label}>Ministries</Text>
				{ministryOptions.map((item, idx) => {
					const ministries = formik.values.ministries || [];
					const index = ministries.findIndex(
						(m) => Number(m.ministryId) === item.value,
					);
					const isSelected = index !== -1;
					const selectedRole = isSelected ? ministries[index].role : null;

					// Get role error from Formik/Yup
					const roleError = formik.errors.ministries;

					return (
						<View key={item.value} style={{ marginBottom: 16 }}>
							{/* Ministry Chip */}
							<TouchableOpacity
								style={[styles.chip, isSelected && styles.chipSelected]}
								onPress={() => {
									if (isSelected) {
										// Remove ministry
										formik.setFieldValue(
											"ministries",
											ministries.filter(
												(m) => Number(m.ministryId) !== item.value,
											),
										);
									} else {
										// Add ministry, default role is Organizer if none exists
										const hasOrganizer = ministries.some(
											(m) => m.role === "Organizer",
										);
										formik.setFieldValue("ministries", [
											...ministries,
											{
												ministryId: item.value,
												role: hasOrganizer ? "Co-organizer" : "Organizer",
											},
										]);
										// Mark touched for role validation
										formik.setFieldTouched(
											`ministries[${ministries.length}].role`,
											true,
										);
									}
								}}
							>
								<Text
									style={[
										styles.chipText,
										isSelected && styles.chipTextSelected,
										{ color: isSelected ? "#fff" : theme.text },
									]}
								>
									{item.label}
								</Text>
							</TouchableOpacity>

							{/* Role Selection */}
							{isSelected && (
								<View
									style={{
										flexDirection: "row",
										marginTop: 6,
										flexWrap: "wrap",
									}}
								>
									{roles.map((role) => (
										<View
											key={role}
											style={{ marginRight: 8, marginBottom: 4 }}
										>
											<TouchableOpacity
												style={[
													styles.roleChip,
													selectedRole === role && styles.roleChipSelected,
												]}
												onPress={() => {
													const newValues = [...ministries];
													newValues[index].role = role;
													formik.setFieldValue("ministries", newValues);
													formik.setFieldTouched(
														`ministries[${index}].role`,
														true,
													);
												}}
											>
												<Text
													style={[
														styles.roleText,
														selectedRole === role && styles.roleTextSelected,
														{
															color:
																selectedRole === role ? "#fff" : theme.text,
														},
													]}
												>
													{role}
												</Text>
											</TouchableOpacity>
										</View>
									))}
								</View>
							)}
							{isSelected && roleError && selectedRole === "Organizer" && (
								<Text style={styles.errorText}>
									multiple organizers not allowed
								</Text>
							)}
						</View>
					);
				})}
			</View>
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>
					{`${id ? "Edit" : "Create"} Event`}
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
		columnGap: 2,
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
	label: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
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
	errorText: { color: "#DC2626", fontSize: 12 },
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
		marginBottom: 4,
		backgroundColor: "#FFFFFF",
	},
	seriesButton: {
		backgroundColor: "#E0F2FE",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 8,
	},
	seriesButtonText: { color: "#0284C7", fontWeight: "600" },
	roleChip: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		marginRight: 6,
	},
	roleChipSelected: {
		backgroundColor: "#22c55e",
		borderColor: "#22c55e",
	},
	roleText: { fontSize: 12 },
	roleTextSelected: { color: "#fff", fontWeight: "600" },
});
