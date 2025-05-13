import api from "./api";

export const sendEmail = async (messageBody: string, nameBody: string): Promise<{ message: string }> => {
	const response = await api.post('/api/contact', { messageBody, nameBody });
	return response.data;
}
