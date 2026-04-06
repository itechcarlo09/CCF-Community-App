import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import Header from "@components/Header";
import Input from "@components/Inputs";
import Loading from "@components/Loading";

import { useEducationForm } from "../hooks/useEducationForm";
import dayjs from "dayjs";
import { MonthYearPicker } from "@components/MonthYearPicker";
import { ModernSwitch } from "@components/ModernSwitch";
import { Dropdown } from "@components/Dropdown";
import { SelectionProps } from "src/types/selectionTypes";
import SelectButton from "@components/SelectButton";
import { NOID } from "src/types/globalTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserStackParamList } from "src/types/navigation";
import EducationLevel from "src/types/enums/EducationLevel";

type UserRouteProp = RouteProp<UserStackParamList, "EducationFormScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const EducationFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { accountId } = route.params || {};
	const currentDate = dayjs().toDate();
	const [selectedSchool, setSelectedSchool] = useState("");

	const { formik, loading } = useEducationForm({
		accountId: accountId ?? NOID,
		onSuccess: () => navigation.goBack(),
	});

	const isCollegeOrSenior = useMemo(() => {
		const val = formik.values.educationLevel;
		if (!val) return false;

		if (
			val.includes("SeniorHigh") ||
			val.includes("College") ||
			val.includes("Masteral") ||
			val.includes("Doctoral")
		) {
			return true;
		} else {
			formik.setFieldValue("course", "");
			return false;
		}
	}, [formik.values.educationLevel]);

	const educationLevelOptions: SelectionProps<keyof typeof EducationLevel>[] =
		Object.entries(EducationLevel).map(([key, value]) => ({
			label: value,
			value: key as keyof typeof EducationLevel,
		}));

	if (loading) return <Loading />;

	return (
		<View style={styles.container}>
			<Header title="Education" onBack={navigation.goBack} />

			<KeyboardAwareScrollView contentContainerStyle={styles.content}>
				{/* SCHOOL SELECT */}
				<SelectButton
					label="School"
					required
					value={formik.values.schoolId > 0 ? selectedSchool : ""}
					placeholder="Select School"
					onPress={() =>
						navigation.navigate("SchoolListScreen", {
							onSelect: (selectedId: number, schoolName: string) => {
								formik.setFieldValue("schoolId", selectedId);
								setSelectedSchool(schoolName);
							},
						})
					}
					error={formik.errors.schoolId}
				/>

				{/* EDUCATION LEVEL */}
				<Dropdown
					title="Education Level"
					items={educationLevelOptions}
					value={formik.values.educationLevel}
					onChange={formik.handleChange("educationLevel")}
					placeholder="Education Level"
					label="Education Level"
					touched={formik.touched.educationLevel}
					error={formik.errors.educationLevel}
					required
				/>

				{/* COURSE */}
				{isCollegeOrSenior && (
					<Input
						label="Course"
						placeholder="Enter Course"
						value={formik.values.course}
						onChangeText={formik.handleChange("course")}
						onBlur={() => formik.setFieldTouched("course")}
						error={formik.errors.course}
						required
					/>
				)}

				<MonthYearPicker
					label="Start Date"
					value={formik.values.startDate}
					onChange={(date) => formik.setFieldValue("startDate", date)}
					touched={formik.touched.startDate}
					error={formik.errors.startDate}
					maxDate={currentDate}
					required
				/>

				<View style={styles.rowBetween}>
					<Text style={[styles.label, { marginBottom: 0 }]}>
						Currently Studying
					</Text>
					<ModernSwitch
						value={formik.values.isCurrent}
						onValueChange={(val) => {
							if (val) formik.setFieldValue("endDate", "");
							formik.setFieldValue("isCurrent", val);
						}}
					/>
				</View>

				{/* END DATE */}
				{!formik.values.isCurrent && (
					<MonthYearPicker
						label="End Date"
						value={formik.values.endDate}
						onChange={(date) => formik.setFieldValue("endDate", date)}
						touched={formik.touched.endDate}
						error={formik.errors.endDate}
						minDate={dayjs(formik.values.startDate).toDate()}
						maxDate={currentDate}
						required
					/>
				)}
			</KeyboardAwareScrollView>

			{/* SUBMIT */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>Save Education</Text>
			</TouchableOpacity>
		</View>
	);
};

export default EducationFormScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
	},
	content: {
		padding: 16,
		paddingBottom: 32,
		rowGap: 8,
	},
	label: {
		fontWeight: "600",
		marginBottom: 6,
		color: "#374151",
	},
	selector: {
		backgroundColor: "#fff",
		padding: 14,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		marginBottom: 16,
	},
	placeholder: {
		color: "#9CA3AF",
	},
	schoolName: {
		fontWeight: "600",
		fontSize: 14,
	},
	schoolSub: {
		color: "#6B7280",
		fontSize: 12,
		marginTop: 2,
	},
	dropdown: {
		borderColor: "#E5E7EB",
		marginBottom: 16,
	},
	rowBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	submitButton: {
		backgroundColor: "#4F46E5",
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		margin: 16,
	},
	submitText: {
		color: "#fff",
		fontWeight: "600",
	},
});
