import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { Formik } from "formik";

const EventSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
});

const EventFormScreen = () => {
	const handleLogin = () => {
		console.log("Event successfully added");
	};

	return (
		<SafeAreaView style={styles.flex}>
			<Formik
				initialValues={{ name: "" }}
				validationSchema={EventSchema}
				onSubmit={handleLogin}
			>
				{({ handleSubmit, values }) => (
					<View>
						<TextField
							name="name"
							label="Event Name"
							placeholder="Enter event name"
						/>
						<Button title="Login" onPress={() => handleSubmit()} />
					</View>
				)}
			</Formik>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	text: { fontSize: 18, fontWeight: "bold" },
});

export default EventFormScreen;
