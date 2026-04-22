import { ToastType, useToast } from "@component/toast/ToastContext";
import { Alert } from "react-native";

export function useErrorUtils() {
	const { show } = useToast();

	function handleApiError(error: any) {
		Alert.alert("Error", error.message ?? "Something went wrong");
	}

	function showText(message: string, type: ToastType = "success") {
		show(message, type);
	}

	function showError(error: Error) {
		console.log("FULL ERROR:", JSON.stringify(error, null, 2));
		const message = getErrorMessage(error);
		show(message, "error");
	}

	return {
		handleApiError,
		showText,
		showError,
	};
}

export const getErrorMessage = (error: any): string => {
	if (error?.response) {
		const data = error.response.data;

		if (typeof data?.message === "string") {
			return data.message;
		}

		if (Array.isArray(data?.message)) {
			return data.message.join(", ");
		}

		if (error.response.status === 409) {
			return "Resource already exists";
		}
	}

	return error?.message || "Something went wrong";
};
