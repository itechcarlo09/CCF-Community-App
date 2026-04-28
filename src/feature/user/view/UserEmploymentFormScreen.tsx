import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import Header from "@component/Header";
import Input from "@component/Inputs";
import Loading from "@component/Loading";
import { MonthYearPicker } from "@component/MonthYearPicker";
import { ModernSwitch } from "@component/ModernSwitch";
import SelectButton from "@component/SelectButton";
import dayjs from "dayjs";
import { NOID } from "src/types/globalTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserStackParamList } from "src/types/navigation";
import { useEmploymentViewModel } from "../../../features/member/viewModel/useEmploymentViewModel";
// import { showText } from "src/utils/errorUtils";
import { useEmploymentForm } from "@features/member/hooks/useEmploymentForm";

type UserRouteProp = RouteProp<UserStackParamList, "EmploymentFormScreen">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const EmploymentFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { accountId, employmentId } = route.params || {};
	const currentDate = dayjs().toDate();
	const { deleteEmployment } = useEmploymentViewModel();

	const { formik, isLoading, employment } = useEmploymentForm({
		accountId: accountId ?? NOID,
		employmentId: employmentId ?? NOID,
		onSuccess: () => navigation.goBack(),
	});

	const [selectedCompany, setSelectedCompany] = useState("");

	useEffect(() => {
		setSelectedCompany(
			`${employment?.company.name} ${
				employment?.company.acronym ? `- ${employment?.company.acronym}` : ""
			}`,
		);
	}, [employment]);

	const handleDelete = async () => {
		try {
			const res = await deleteEmployment(employmentId ?? NOID);
			if (res?.success) navigation.goBack();
		} catch (error) {
			// showText("Error deleting employment", "error");
		}
	};

	if (isLoading) return <Loading />;

	return (
		<View style={styles.container}>
			<Header
				title="Employment"
				onBack={navigation.goBack}
				onDelete={employmentId ? handleDelete : undefined}
			/>

			<KeyboardAwareScrollView contentContainerStyle={styles.content}>
				{/* COMPANY SELECT */}
				<SelectButton
					label="Company"
					required
					value={formik.values.companyId > 0 ? selectedCompany : ""}
					placeholder="Select Company"
					onPress={() =>
						navigation.navigate("CompanyListScreen", {
							onSelect: (selectedId: number, companyName: string) => {
								formik.setFieldValue("companyId", selectedId);
								setSelectedCompany(companyName);
							},
						})
					}
					error={formik.errors.companyId}
				/>

				{/* POSITION */}
				<Input
					label="Position"
					placeholder="Enter Position"
					value={formik.values.position}
					onChangeText={formik.handleChange("position")}
					onBlur={() => formik.setFieldTouched("position")}
					error={formik.errors.position}
					required
				/>

				{/* START DATE */}
				<MonthYearPicker
					label="Start Date"
					value={formik.values.startDate}
					onChange={(date) => formik.setFieldValue("startDate", date)}
					touched={formik.touched.startDate}
					error={formik.errors.startDate}
					maxDate={currentDate}
					required
				/>

				{/* CURRENTLY WORKING */}
				<View style={styles.rowBetween}>
					<Text style={[styles.label, { marginBottom: 0 }]}>
						Currently Working
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
				<Text style={styles.submitText}>Save Employment</Text>
			</TouchableOpacity>
		</View>
	);
};

export default EmploymentFormScreen;

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
