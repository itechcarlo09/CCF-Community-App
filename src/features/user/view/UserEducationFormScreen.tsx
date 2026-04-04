import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";
import Input from "@components/Inputs";
import Loading from "@components/Loading";

import { useEducationForm } from "../hooks/useEducationForm";

const EducationFormScreen = () => {
	const navigation = useNavigation();
	const [isCurrent, setIsCurrent] = useState(false);

	const { formik, loading } = useEducationForm({
		onSuccess: () => navigation.goBack(),
	});

	const isCollegeOrSenior = useMemo(() => {
		const val = formik.values.gradeYear;
		if (!val) return false;

		return (
			val.includes("Grade11") ||
			val.includes("Grade12") ||
			val.includes("College") ||
			val === "UnderGraduate" ||
			val === "Graduated"
		);
	}, [formik.values.gradeYear]);

	if (loading) return <Loading />;

	return (
		<View style={styles.container}>
			<Header title="Education" onBack={navigation.goBack} />

			<KeyboardAwareScrollView contentContainerStyle={styles.content}>
				{/* SCHOOL SELECT */}
				<Text style={styles.label}>School *</Text>
				<TouchableOpacity
					style={styles.selector}
					onPress={() => navigation.navigate("SchoolListScreen" as never)}
				>
					{/* {selectedSchool ? (
						<View>
							<Text style={styles.schoolName}>{selectedSchool.name}</Text>
							<Text style={styles.schoolSub}>
								{selectedSchool.acronym} • {selectedSchool.address}
							</Text>
						</View>
					) : ( */}
					<Text style={styles.placeholder}>Select School</Text>
					{/* )} */}
				</TouchableOpacity>

				{/* GRADE YEAR */}
				{/* <Text style={styles.label}>Grade Year *</Text>
				<DropDownPicker
					open={formik.values.gradeOpen}
					value={formik.values.gradeYear}
					items={formik.values.gradeItems}
					setOpen={(open) => formik.setFieldValue("gradeOpen", open)}
					setValue={(callback) =>
						formik.setFieldValue("gradeYear", callback(formik.values.gradeYear))
					}
					style={styles.dropdown}
				/> */}

				{/* COURSE */}
				{isCollegeOrSenior && (
					<Input
						label="Course"
						placeholder="Enter Course"
						value={formik.values.course}
						onChangeText={formik.handleChange("course")}
					/>
				)}

				{/* START YEAR */}
				<Input
					label="Start Year *"
					placeholder="e.g. 2018"
					keyboardType="numeric"
					value={formik.values.startYear}
					onChangeText={formik.handleChange("startYear")}
				/>

				{/* CURRENTLY STUDYING */}
				<View style={styles.rowBetween}>
					<Text style={styles.label}>Currently Studying</Text>
					<Switch
						value={isCurrent}
						onValueChange={(val) => setIsCurrent(val)}
					/>
				</View>

				{/* END YEAR */}
				{!isCurrent && (
					<Input
						label="End Year"
						placeholder="e.g. 2022"
						keyboardType="numeric"
						value={formik.values.endYear}
						onChangeText={formik.handleChange("endYear")}
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
		marginTop: 8,
		marginBottom: 8,
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
