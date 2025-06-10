import axios from "axios";
import * as jose from "jose";

const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");

	if (token) {
		if (!secret) {
			console.error("SECRET_KEY not defined");
			return Promise.reject(new Error("Server configuration error"));
		}

		jose.jwtVerify(token, new TextEncoder().encode(secret));
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	}

	localStorage.removeItem("token");
	return Promise.reject(new Error("Invalid token"));
});

export default api;
