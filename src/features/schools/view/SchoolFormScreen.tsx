import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { NOID } from "src/types/globalTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventStackParamList } from "src/types/navigation";
import Input from "@components/Inputs";
import Loading from "@components/Loading";
import { useSchoolForm } from "../hooks/useSchoolForm";

type UserRouteProp = RouteProp<EventStackParamList, "SchoolForm">;
type NavProp = NativeStackNavigationProp<EventStackParamList>;

const SchoolFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id, onSuccess } = route.params || {};

	const { formik, loading } = useSchoolForm({
		schoolId: id ? id : NOID,
		onSuccess: () => {
			if (onSuccess) onSuccess();
			navigation.goBack();
		},
	});

	if (loading) return <Loading />;

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={styles.container}
		>
			<Text style={styles.title}>{`${id ? "Edit" : "Create"} School`}</Text>

			<Text style={styles.section}>Basic Information</Text>

			{/* NAME */}
			<Input
				label="School Name"
				placeholder="Enter School Name"
				value={formik.values.name}
				onChangeText={formik.handleChange("name")}
				onBlur={() => formik.setFieldTouched("name")}
				error={formik.touched.name ? formik.errors.name : undefined}
				required
			/>

			{/* ACRONYM */}
			<Input
				label="Acronym"
				placeholder="Enter Acronym (optional)"
				value={formik.values.acronym}
				onChangeText={formik.handleChange("acronym")}
				onBlur={() => formik.setFieldTouched("acronym")}
				error={formik.touched.acronym ? formik.errors.acronym : undefined}
			/>

			{/* ADDRESS */}
			<Input
				label="Address"
				placeholder="Enter School Address"
				value={formik.values.address}
				onChangeText={formik.handleChange("address")}
				onBlur={() => formik.setFieldTouched("address")}
				error={formik.touched.address ? formik.errors.address : undefined}
				required
			/>

			{/* SUBMIT */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>
					{`${id ? "Edit" : "Create"} School`}
				</Text>
			</TouchableOpacity>
		</KeyboardAwareScrollView>
	);
};

export default SchoolFormScreen;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingBottom: 32,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 16,
		color: "#111827",
	},
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
	submitText: {
		color: "#fff",
		fontWeight: "600",
	},
});
