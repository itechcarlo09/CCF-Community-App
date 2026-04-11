import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export function handleApiError(error: any) {
	Alert.alert("Error", error.message ?? "Something went wrong");
}

export function showError(error: any) {
	Toast.show({
		type: "error",
		text1: "Error",
		text2:
			error?.response?.data?.message ||
			error?.message ||
			"Something went wrong",
		position: "bottom",
	});
}
