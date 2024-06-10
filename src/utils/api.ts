import axios from "axios";

export const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	},
});
