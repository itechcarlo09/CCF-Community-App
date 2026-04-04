import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useUserForm } from "../hooks/useUserForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NOID } from "src/types/globalTypes";
import { UserStackParamList } from "src/types/navigation";
import Loading from "@components/Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateForDisplay, formatPHNumber } from "src/utils/dateFormatter";
import Input from "@components/Inputs";
import { normalizeGender } from "src/utils/stringUtils";
import { DatePicker } from "@components/DatePicker";
import Header from "@components/Header";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;
type NavProp = NativeStackNavigationProp<UserStackParamList>;

const PHContactInput = ({
	value,
	onChange,
	label,
	error,
}: {
	value: string;
	onChange: (formatted: string) => void;
	label: string;
	error?: string;
}) => {
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.phInputContainer}>
				<Text style={styles.prefix}>+63</Text>
				<TextInput
					style={styles.phInput}
					value={value}
					onChangeText={(value) => onChange(formatPHNumber(value))}
					keyboardType="number-pad"
					maxLength={12}
					placeholder="912-345-6789"
					placeholderTextColor="#9CA3AF"
				/>
			</View>
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const UserDetailFormScreen = () => {
	const navigation = useNavigation<NavProp>();
	const route = useRoute<UserRouteProp>();
	const { id, onSuccess } = route.params || {};
	const [showDatePicker, setShowDatePicker] = useState(false);

	const { formik, loading, user } = useUserForm({
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

	if (loading) return <Loading />;

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
				{/* BASIC INFO */}
				<Text style={styles.section}>Basic Information</Text>
				<Input
					label="First Name"
					placeholder="Enter First Name"
					value={formik.values.firstName}
					onChangeText={formik.handleChange("firstName")}
					onBlur={() => formik.setFieldTouched("firstName")}
					error={formik.touched.firstName ? formik.errors.firstName : undefined}
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
					error={formik.touched.lastName ? formik.errors.lastName : undefined}
					required
				/>

				<DatePicker
					value={formik.values.birthdate}
					onChange={(date) => formik.setFieldValue("birthdate", date)}
					touched={formik.touched.birthdate}
					error={formik.errors.birthdate}
					label="Birth Date"
				/>

				{/* Gender */}
				<View style={{ marginBottom: 12 }}>
					<Text style={styles.label}>Gender</Text>
					<View style={styles.genderContainer}>
						{["Male", "Female"].map((option) => (
							<TouchableOpacity
								key={option}
								style={[
									styles.genderButton,
									formik.values.gender === option &&
										styles.genderButtonSelected,
								]}
								onPress={() => formik.setFieldValue("gender", option)}
							>
								<Text
									style={[
										styles.genderButtonText,
										formik.values.gender === option &&
											styles.genderButtonTextSelected,
									]}
								>
									{option}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					{formik.touched.gender && formik.errors.gender && (
						<Text style={styles.errorText}>{formik.errors.gender}</Text>
					)}
				</View>

				{/* CONTACT */}
				<Text style={styles.section}>Contact</Text>
				<PHContactInput
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
					error={formik.touched.facebook ? formik.errors.facebook : undefined}
				/>

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
				<PHContactInput
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

				{/* LEADER */}
				<Text style={styles.section}>Discipleship</Text>
				<TouchableOpacity
					style={styles.leaderButton}
					onPress={handleAssignDLeader}
				>
					<Text style={styles.leaderButtonText}>
						{formik.values.dLeadersName
							? `Leader: ${formik.values.dLeadersName}`
							: "Select Leader"}
					</Text>
				</TouchableOpacity>
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
	container: { padding: 16, backgroundColor: "#F9FAFB", rowGap: 10 },
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
		marginTop: 24,
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
