import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { Login } from "../../../feature/auth/model/Login";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { toast } from "@component/toast/toast";
import { useAccountStore } from "@features/account/account.store";
import { userRepository } from "@features/member/data/userRepository";

const useLoginForm = () => {
	const [loading, setLoading] = useState(false);
	const { setAccount, clearAccount } = useAccountStore();

	const login = async (email: string): Promise<boolean> => {
		const account = await userRepository.getUserByEmail(email);

		if (account) {
			setAccount(account);
			return true;
		}

		return false;
	};

	const logout = () => {
		clearAccount();
	};

	const navigation =
		useNavigation<NativeStackNavigationProp<AppStackParamList, "Login">>();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				// .email("Invalid email format") // TODO Uncomment if email validation is needed
				.required("Email is required"),
			password: Yup.string().required("Password is required"),
			// .min(8, "Password must be at least 8 characters")
			// .matches(/[A-Z]/, "Must contain at least one uppercase letter")
			// .matches(/[a-z]/, "Must contain at least one lowercase letter")
			// .matches(/[0-9]/, "Must contain at least one number")
			// .matches(/[@$!%*?&]/, "Must contain at least one special character"), // TODO Uncomment if password validation is needed
		}),
		onSubmit: async (values) => {
			setLoading(true);
			try {
				// const auth: Omit<Login, "id" | "createdAt" | "updatedAt"> = {
				// 	email: values.email,
				// 	password: values.password,
				// };
				if (await login(values.email)) {
					navigation.navigate("BottomNavigator");
				} else {
					toast.error("Login failed. Please try again.");
				}
			} catch (err) {
				Alert.alert("Error", "Failed to save user");
			} finally {
				setLoading(false);
			}
		},
	});

	return {
		login,
		logout,
		formik,
		loading,
	};
};

export default useLoginForm;
