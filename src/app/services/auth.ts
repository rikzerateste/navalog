import api from "./api";

export const login = async (username: string, password: string) => {
	const body = {
		username,
		password
	};

	const response = await api.post("v1/auth/login", body);
	return response.data;
};
