import axios from "axios";
import Config from "react-native-config";

const apiClient = axios.create({
	baseURL: Config.API_BASE_URL,
	timeout: 8000,
	headers: { "Content-Type": "application/json" },
});

// Request Interceptor
apiClient.interceptors.request.use(async (config) => {
	console.log("Request URL:", config.baseURL + config.url);
	// Example: load token from storage
	// const token = await AsyncStorage.getItem('token');
	// if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// Response Interceptor
apiClient.interceptors.response.use(
	(res) => res,
	(error) => {
		console.error("API Error:", error.message);
		return Promise.reject(error);
	}
);

export default apiClient;
