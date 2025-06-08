import axios from "axios";
import jwt from "jsonwebtoken";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");

	if (token) {
		try {
			const secret = process.env.SECRET_KEY;

			if (!secret) {
				console.error("SECRET_KEY not defined");
				return Promise.reject(new Error("Server configuration error"));
			}

			jwt.verify(token, secret);
			config.headers.Authorization = `Bearer ${token}`;
		} catch (error) {
			localStorage.removeItem("token");
			return Promise.reject(new Error("Invalid token"));
		}
	}

	return config;
});

export default api;
