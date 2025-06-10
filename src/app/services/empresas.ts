import api from "./api";

export interface Empresa {
	Codigo?: number;
	Empresa: string;
	Endereco: string;
	Num: string;
	Cidade: string;
	Bairro: string;
	Cep?: string;
	UF?: string;
	CNPJ?: string;
	Inscricao_Estadual?: string;
	Contato: string;
	Fone_1: string;
	Fone_2: string;
	Celular?: string;
	Email?: string;
	Empresa_certificado?: string;
	Empresa_vencecert?: string;
}

export const getEmpresas = async (): Promise<Empresa[]> => {
	const response = await api.get("v1/empresas");
	return response.data;
};

export const createEmpresa = async (empresa: Empresa) => {
	const response = await api.post("v1/empresas", empresa);
	return response.data;
};

export const updateEmpresa = async (empresa: Empresa) => {
	const response = await api.put(`v1/empresas/${empresa.Codigo}`, empresa);
	return response.data;
};

export const deleteEmpresa = async (codigoEmpresa: string) => {
	const response = await api.delete(`v1/empresas/${codigoEmpresa}`);
	return response.data;
};
