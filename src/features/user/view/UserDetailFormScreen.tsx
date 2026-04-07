import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useUserForm } from "../hooks/useUserForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NOID } from "src/types/globalTypes";
import { UserStackParamList } from "src/types/navigation";
import Loading from "@components/Loading";
import Input from "@components/Inputs";
import { normalizeGender } from "src/utils/stringUtils";
import { DatePicker } from "@components/DatePicker";
import Header from "@components/Header";
import ChoiceChip from "@components/ChoiceChip";
import { mapEnumToOptions } from "src/utils/selectionUtils";
import { Gender } from "src/types/enums/Gender";
import { ContactInputs } from "@components/ContactInputs";
import SelectButton from "@components/SelectButton";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const genderOptions = mapEnumToOptions(Gender);

const UserDetailFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id, onSuccess } = route.params || {};
	const minus10YearsForCurrentDate = new Date(
		new Date().setFullYear(new Date().getFullYear() - 10),
	);

	const { formik, isLoading, user } = useUserForm({
		userId: id ? id : NOID,
		onSuccess: () => {
			if (onSuccess) onSuccess();
			navigation.goBack();
		},
	});

	const handleAssignDLeader = useCallback(() => {
		const gender = normalizeGender(user?.gender);
		const parsedId = Number(id);
		const safeId = !isNaN(parsedId) ? parsedId : NOID;

		if (!gender) return;

		navigation.navigate("DleaderScreen", {
			id: safeId,
			gender,
			onSelect: (selectedId: number, fullName: string) => {
				formik.setFieldValue("dLeaderID", selectedId);
				formik.setFieldValue("dLeaderName", fullName);
			},
		});
	}, [user?.gender, id, navigation, formik]);

	if (isLoading) return <Loading />;

	return (
		<View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
			<Header
				title={`${id ? "Edit" : "Create"} User`}
				onBack={navigation.goBack}
			/>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={styles.container}
			>
				<View style={{ flex: 1, rowGap: 24 }}>
					<View style={{ rowGap: 8 }}>
						{/* BASIC INFO */}
						<Text style={styles.section}>Basic Information</Text>
						<Input
							label="First Name"
							placeholder="Enter First Name"
							value={formik.values.firstName}
							onChangeText={formik.handleChange("firstName")}
							onBlur={() => formik.setFieldTouched("firstName")}
							error={
								formik.touched.firstName ? formik.errors.firstName : undefined
							}
							required
						/>
						<Input
							label="Middle Name"
							placeholder="Enter Middle Name"
							value={formik.values.middleName}
							onChangeText={formik.handleChange("middleName")}
							onBlur={() => formik.setFieldTouched("middleName")}
							error={
								formik.touched.middleName ? formik.errors.middleName : undefined
							}
						/>
						<Input
							label="Last Name"
							placeholder="Enter Last Name"
							value={formik.values.lastName}
							onChangeText={formik.handleChange("lastName")}
							onBlur={() => formik.setFieldTouched("lastName")}
							error={
								formik.touched.lastName ? formik.errors.lastName : undefined
							}
							required
						/>

						<DatePicker
							value={formik.values.birthdate}
							onChange={(date) => formik.setFieldValue("birthdate", date)}
							touched={formik.touched.birthdate}
							error={formik.errors.birthdate}
							label="Birth Date"
							required
							maximumDate={minus10YearsForCurrentDate}
						/>

						<ChoiceChip
							label="Gender"
							required
							name="gender"
							value={formik.values.gender}
							options={genderOptions}
							onChange={formik.setFieldValue}
							touched={formik.touched.gender}
							error={formik.errors.gender}
						/>
					</View>
					<View style={{ rowGap: 8 }}>
						{/* CONTACT */}
						<Text style={styles.section}>Contact</Text>
						<ContactInputs
							label="Contact Number"
							value={formik.values.contactNumber}
							onChange={(formatted) =>
								formik.setFieldValue("contactNumber", formatted)
							}
							error={
								formik.touched.contactNumber
									? formik.errors.contactNumber
									: undefined
							}
						/>
						<Input
							label="Email"
							placeholder="Enter Email"
							value={formik.values.email}
							onChangeText={formik.handleChange("email")}
							onBlur={() => formik.setFieldTouched("email")}
							error={formik.touched.email ? formik.errors.email : undefined}
							required
						/>
						<Input
							label="Facebook"
							placeholder="Enter Facebook Link"
							value={formik.values.facebook}
							onChangeText={formik.handleChange("facebook")}
							onBlur={() => formik.setFieldTouched("facebook")}
							error={
								formik.touched.facebook ? formik.errors.facebook : undefined
							}
						/>
					</View>

					<View style={{ rowGap: 8 }}>
						{/* EMERGENCY CONTACT */}
						<Text style={styles.section}>Emergency Contact</Text>
						<Input
							label="Person"
							placeholder="Enter Person's Fullname"
							value={formik.values.emergencyPerson}
							onChangeText={formik.handleChange("emergencyPerson")}
							onBlur={() => formik.setFieldTouched("emergencyPerson")}
							error={
								formik.touched.emergencyPerson
									? formik.errors.emergencyPerson
									: undefined
							}
						/>
						<ContactInputs
							label="Emergency Number"
							value={formik.values.emergencyNumber}
							onChange={(formatted) =>
								formik.setFieldValue("emergencyNumber", formatted)
							}
							error={
								formik.touched.emergencyNumber
									? formik.errors.emergencyNumber
									: undefined
							}
						/>
					</View>

					<SelectButton
						label="Leader"
						required
						value={formik.values.dLeadersName}
						placeholder="Select Leader"
						onPress={handleAssignDLeader}
						error={
							formik.touched.dLeaderID
								? (formik.errors.dLeaderID as string)
								: undefined
						}
					/>
				</View>
			</KeyboardAwareScrollView>
			{/* SUBMIT */}
			<TouchableOpacity
				style={styles.submitButton}
				onPress={formik.handleSubmit as any}
			>
				<Text style={styles.submitText}>
					{`${id ? "Edit" : "Create"} User`}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default UserDetailFormScreen;

// 🎨 Styles
const styles = StyleSheet.create({
	container: { paddingHorizontal: 16, backgroundColor: "#F9FAFB" },
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 16,
		color: "#111827",
	},
	section: {
		fontSize: 16,
		fontWeight: "600",
		color: "#374151",
	},
	labelRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	required: {
		color: "#EF4444",
		fontSize: 14,
		fontWeight: "600",
	},
	label: { fontSize: 12, color: "#6B7280", marginBottom: 4 },
	inputContainer: { marginBottom: 12 },
	errorText: { color: "#DC2626", fontSize: 12, marginTop: 4 },
	birthDateTouchable: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		padding: 12,
		justifyContent: "center",
		marginBottom: 12,
		backgroundColor: "#FFFFFF",
	},
	leaderButton: {
		backgroundColor: "#E0F2FE",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 8,
	},
	leaderButtonText: { color: "#0284C7", fontWeight: "600" },
	submitButton: {
		backgroundColor: "#4F46E5",
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 10,
		marginHorizontal: 16,
	},
	submitText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
	genderContainer: { flexDirection: "row", gap: 12, marginBottom: 12 },
	genderButton: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		alignItems: "center",
	},
	genderButtonSelected: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
	genderButtonText: { color: "#111827", fontWeight: "500" },
	genderButtonTextSelected: { color: "#FFFFFF", fontWeight: "600" },
	phInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 12,
	},
	prefix: {
		fontSize: 16,
		marginRight: 4,
		color: "#111827",
	},
	phInput: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 10,
		color: "#111827",
	},
});
