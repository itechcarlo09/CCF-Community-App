import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFirestore } from "@react-native-firebase/firestore";
import { getApp } from "@react-native-firebase/app";
import {
	createUser,
	getUser,
	updateUser,
} from "../../firebase/firestore/userService";
import { User } from "../../firebase/firestore/types/User";
import { RouteProp, useRoute } from "@react-navigation/native";
import { UserStackParamList } from "../../navigation/types";

type UserRouteProp = RouteProp<UserStackParamList, "UserForm">;

const UserSchema = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
});

const UserFormScreen = () => {
	const route = useRoute<UserRouteProp>();
	const { id: userId = null } = route.params || {};
	const [loading, setLoading] = useState<boolean>(!!userId);
	const [initialValues, setInitialValues] = useState<
		Omit<User, "id" | "createdAt">
	>({
		firstName: "",
		middleName: "",
		lastName: "",
	});

	useEffect(() => {
		if (userId) {
			(async () => {
				const user = await getUser(userId);
				if (user) {
					setInitialValues({
						firstName: user.firstName,
						middleName: user.middleName || "",
						lastName: user.lastName,
						updatedAt: new Date(),
					});
				}
				setLoading(false);
			})();
		}
	}, [userId]);

	const insets = useSafeAreaInsets();

	const handleSubmit = async (
		values: typeof initialValues,
		{ resetForm }: any
	) => {
		try {
			userId
				? await updateUser(userId, values as Partial<User>)
				: await createUser({
						createdAt: new Date(),
						...values,
				  });
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
