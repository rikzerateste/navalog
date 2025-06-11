import axios from "axios";
import * as jose from "jose";

const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

const publicRoutes = [
	"/auth/login"
];

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
	const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

	if (isPublicRoute) return config;

	const token = localStorage.getItem("token");

	if (token) {
		if (!secret) {
			console.error("SECRET_KEY not defined");
			return Promise.reject(new Error("Server configuration error"));
		}

		const secretKey = new TextEncoder().encode(secret);
		jose.jwtVerify(token, secretKey);

		config.headers.Authorization = `Bearer ${token}`;
		return config;
	}

	return Promise.reject(new Error("Invalid token"));
});

export default api;
