import axios from "axios";
import Config from "react-native-config";

const apiClient = axios.create({
	baseURL: Config.API_BASE_URL,
	timeout: 8000,
	headers: { "Content-Type": "application/json" },
});

// Request Interceptor
apiClient.interceptors.request.use(async (config) => {
	const baseURL = config.baseURL ?? "";
	const url = config.url ?? "";

	let fullUrl = baseURL + url;

	if (config.params) {
		const queryString = new URLSearchParams(config.params).toString();
		if (queryString) {
			fullUrl += `?${queryString}`;
		}
	}

	console.log("Request URL:", fullUrl);

	return config;
});

// Response Interceptor
apiClient.interceptors.response.use(
	(res) => res,
	(error) => {
		console.error("API Error:", error.message);
		return Promise.reject(error);
	},
);

export default apiClient;
