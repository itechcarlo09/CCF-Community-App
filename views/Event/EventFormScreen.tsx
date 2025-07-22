import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EventSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
});

const EventFormScreen = () => {
	const insets = useSafeAreaInsets();
	const handleLogin = () => {
		console.log("Event successfully added");
	};

	return (
		<Formik
			initialValues={{ name: "" }}
			validationSchema={EventSchema}
			onSubmit={handleLogin}
		>
			{({ handleSubmit }) => (
				<View style={[styles.flex, { paddingTop: insets.top }]}>
					<TextField
						name="name"
						label="Event Name"
						placeholder="Enter event name"
					/>
					<Button title="Create Event" onPress={() => handleSubmit()} />
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1, paddingHorizontal: 16 },
	text: { fontSize: 18, fontWeight: "bold" },
});

export default EventFormScreen;
