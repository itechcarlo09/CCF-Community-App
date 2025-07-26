import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	createUser,
	getUser,
	updateUser,
} from "../../firebase/firestore/userService";
import { CreateUserInput, User } from "../../firebase/firestore/types/User";
import { RouteProp, useRoute } from "@react-navigation/native";
import DatePicker from "../../components/DatePicker";
import dayjs from "dayjs";
import { UserStackParamList } from "../../src/types/navigation";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;

const UserSchema = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	birthDate: Yup.date().required("Birthdate is required"),
});

const UserFormScreen = ({ navigation }: any) => {
	const insets = useSafeAreaInsets();
	const route = useRoute<UserRouteProp>();
	const { id: userId = null } = route.params || {};
	const [loading, setLoading] = useState<boolean>(!!userId);
	const [initialValues, setInitialValues] = useState<
		Omit<CreateUserInput, "id" | "createdAt">
	>({
		firstName: "",
		middleName: "",
		lastName: "",
		birthDate: dayjs().subtract(13, "year").toDate(),
	});

	useEffect(() => {
		if (userId) {
			(async () => {
				const user = await getUser(userId);
				if (user) {
					console.log("User data:", user.birthDate);
					setInitialValues({
						firstName: user.firstName,
						middleName: user.middleName || "",
						lastName: user.lastName,
						// TODO handle null birthDate
						birthDate:
							user.birthDate?.toDate() ?? dayjs().subtract(13, "year").toDate(), // Default to 13 years ago if birthDate is null
						updatedAt: new Date(),
					});
				}
				setLoading(false);
			})();
		}
	}, [userId]);

	const handleSubmit = async (
		values: typeof initialValues,
		{ resetForm }: any
	) => {
		try {
			userId
				? await updateUser(userId, values as Partial<User>)
				: await createUser({
						...values,
				  });
			navigation.goBack();
			resetForm();
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	if (loading) {
		return <ActivityIndicator size="large" style={styles.loader} />;
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={UserSchema}
			onSubmit={handleSubmit}
		>
			{({ handleSubmit }) => (
				<View style={[styles.flex, { paddingTop: insets.top }]}>
					<TextField
						name="firstName"
						label="First Name"
						placeholder="Enter First Name"
					/>
					<TextField
						name="middleName"
						label="Middle Name"
						placeholder="Enter Middle Name"
					/>
					<TextField
						name="lastName"
						label="Last Name"
						placeholder="Enter Last Name"
					/>
					<Field name="birthDate" component={DatePicker} label="Birth Date" />
					<Button
						title={`${userId ? "Edit" : "Add"} User`}
						onPress={() => handleSubmit()}
					/>
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1, paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold" },
	loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default UserFormScreen;
