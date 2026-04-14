import { ToastType, useToast } from "@components/toast/ToastContext";
import { Alert } from "react-native";

const { show } = useToast();

export function handleApiError(error: any) {
	Alert.alert("Error", error.message ?? "Something went wrong");
}

export function showText(message: string, type: ToastType = "success") {
	show(message, type);
}

export function showError(error: Error) {
	console.log("FULL ERROR:", JSON.stringify(error, null, 2));
	const message = getErrorMessage(error);
	show(message, "error");
}

export const getErrorMessage = (error: any): string => {
	// ✅ Axios error with backend response
	if (error?.response) {
		const data = error.response.data;

		// your case: { message: "name already exists" }
		if (typeof data?.message === "string") {
			return data.message;
		}

		// validation errors (array)
		if (Array.isArray(data?.message)) {
			return data.message.join(", ");
		}

		// fallback to status-based message
		if (error.response.status === 409) {
			return "Resource already exists";
		}
	}

	// ❌ fallback (this is what you're seeing now)
	return error?.message || "Something went wrong";
};
