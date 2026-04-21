import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { NOID } from "src/types/globalTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventStackParamList } from "src/types/navigation";
import Input from "@component/Inputs";
import Loading from "@component/Loading";
import { useMinistryForm } from "../hooks/useMinistryForm";

type UserRouteProp = RouteProp<EventStackParamList, "EventForm">;
type NavProp = NativeStackNavigationProp<EventStackParamList>;

const CreateMinistryScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id, onSuccess } = route.params || {};
	const { formik, loading } = useMinistryForm({
		ministryId: id ? id : NOID,
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
			<Text style={styles.title}>{`${id ? "Edit" : "Create"} Ministry`}</Text>

			<Text style={styles.section}>Basic Information</Text>
			<Input
				label="Ministry Name"
				placeholder="Enter Ministry Name"
				value={formik.values.name}
				onChangeText={formik.handleChange("name")}
				onBlur={() => formik.setFieldTouched("name")}
				error={formik.touched.name ? formik.errors.name : undefined}
				required
			/>

			<Input
				label="Mission"
				placeholder="Enter Mission"
				value={formik.values.mission}
				onChangeText={formik.handleChange("mission")}
				onBlur={() => formik.setFieldTouched("mission")}
				error={formik.touched.mission ? formik.errors.mission : undefined}
			/>

			<Input
				label="Vision"
				placeholder="Enter Vision"
				value={formik.values.vision}
				onChangeText={formik.handleChange("vision")}
				onBlur={() => formik.setFieldTouched("vision")}
				error={formik.touched.vision ? formik.errors.vision : undefined}
			/>

			<Input
				label="Description"
				placeholder="Enter Description"
				value={formik.values.description}
				onChangeText={formik.handleChange("description")}
				onBlur={() => formik.setFieldTouched("description")}
				error={
					formik.touched.description ? formik.errors.description : undefined
				}
			/>

			{/* SUBMIT */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>
					{`${id ? "Edit" : "Create"} Ministry`}
				</Text>
			</TouchableOpacity>
		</KeyboardAwareScrollView>
	);
};

export default CreateMinistryScreen;

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
