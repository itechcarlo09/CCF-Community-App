import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { NOID } from "src/types/globalTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OtherStackParamList } from "src/types/navigation";
import Input from "@components/Inputs";
import Loading from "@components/Loading";
import Header from "@components/Header";
import { useCompanyForm } from "../hooks/useCompanyForm";

type CompanyRouteProp = RouteProp<OtherStackParamList, "CompanyFormScreen">;
type NavProp = NativeStackNavigationProp<OtherStackParamList>;

const CompanyFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<CompanyRouteProp>();
	const { id } = route.params || {};

	const { formik, loading } = useCompanyForm({
		companyId: id ? id : NOID,
		onSuccess: () => {
			navigation.goBack();
		},
	});

	if (loading) return <Loading />;

	return (
		<View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
			<Header
				title={`${id ? "Edit" : "Create"} Company`}
				onBack={navigation.goBack}
			/>

			<KeyboardAwareScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={styles.container}
			>
				{/* NAME */}
				<Input
					label="Company Name"
					placeholder="Enter Company Name"
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
					placeholder="Enter Company Address"
					value={formik.values.address}
					onChangeText={formik.handleChange("address")}
					onBlur={() => formik.setFieldTouched("address")}
					error={formik.touched.address ? formik.errors.address : undefined}
					required
				/>
			</KeyboardAwareScrollView>

			{/* SUBMIT */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>
					{`${id ? "Edit" : "Create"} Company`}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CompanyFormScreen;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		rowGap: 8,
		paddingBottom: 32,
		backgroundColor: "#F9FAFB",
	},
	submitButton: {
		backgroundColor: "#4F46E5",
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 24,
		marginHorizontal: 16,
		marginVertical: 10,
	},
	submitText: {
		color: "#fff",
		fontWeight: "600",
	},
});
