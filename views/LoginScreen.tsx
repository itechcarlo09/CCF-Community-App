import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
	Alert,
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { RootStackParamList } from "../navigation/types";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.oneOf(["Admin"], 'username must be "admin"')
		.required("Required"),
	password: Yup.string()
		.oneOf(["1234"], 'Input must be "1234"')
		.required("Required"),
});

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LoginScreen = ({ navigation }: Props) => {
	const [secure, setSecure] = useState(true);

	const handleLogin = () => {
		console.log("Login successful");
		navigation.replace("BottomNavigation"); // Replace Login with Home screen
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Formik
				initialValues={{ username: "", password: "" }}
				validationSchema={LoginSchema}
				onSubmit={handleLogin}
			>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<View>
						<Text>Login</Text>
						<TextInput
							style={{
								height: 40,
								borderColor: "gray",
								borderWidth: 1,
								marginBottom: 10,
								paddingHorizontal: 10,
							}}
							id="email"
							onChangeText={handleChange("username")}
							placeholder="Username"
							value={values.username}
						/>
						<Text>Password</Text>
						<View style={styles.inputWrapper}>
							<TextInput
								style={styles.input}
								placeholder="Password"
								secureTextEntry={secure}
								value={values.password}
								onChangeText={handleChange("password")}
							/>
							<TouchableOpacity onPress={() => setSecure(!secure)}>
								<Text style={styles.toggle}>{secure ? "Show" : "Hide"}</Text>
							</TouchableOpacity>
						</View>
						<Button title="Login" onPress={() => handleSubmit()} />
					</View>
				)}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "gray",
		paddingHorizontal: 10,
		width: "80%",
	},
	input: {
		flex: 1,
		paddingVertical: 12,
	},
	toggle: {
		color: "#007BFF",
		paddingLeft: 12,
	},
});

export default LoginScreen;
