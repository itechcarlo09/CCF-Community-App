import { Alert } from "react-native";

export function handleApiError(error: any) {
	Alert.alert("Error", error.message ?? "Something went wrong");
}
