import React from "react";
import { View, StyleSheet, Button } from "react-native";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFirestore } from "@react-native-firebase/firestore";
import { getApp } from "@react-native-firebase/app";
import { createUser } from "../../firebase/firestore/userService";
import { CreateUserInput, User } from "../../firebase/firestore/types/User";

const UserSchema = Yup.object().shape({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
});

const UserFormScreen = () => {
	const app = getApp();
	const db = getFirestore(app);

	const initialValues: Omit<CreateUserInput, "id" | "createdAt"> = {
		firstName: "",
		middleName: "",
		lastName: "",
	};

	const insets = useSafeAreaInsets();

	const handleSubmit = async (
		values: typeof initialValues,
		{ resetForm }: any
	) => {
		try {
			await createUser({
				...values,
			});
			resetForm();
			console.log("User created");
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

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
					<Button title="Add User" onPress={() => handleSubmit()} />
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1, paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold" },
});

export default UserFormScreen;
