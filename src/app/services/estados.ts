export interface Estado {
	name: string;
	sigla: string;
}

export const getEstados = (): Estado[] => {
	return [
		{ name: "Acre", sigla: "AC" },
		{ name: "Alagoas", sigla: "AL" },
		{ name: "Amapá", sigla: "AP" },
		{ name: "Amazonas", sigla: "AM" },
		{ name: "Bahia", sigla: "BA" },
		{ name: "Ceará", sigla: "CE" },
		{ name: "Distrito Federal", sigla: "DF" },
		{ name: "Espírito Santo", sigla: "ES" },
		{ name: "Goiás", sigla: "GO" },
		{ name: "Maranhão", sigla: "MA" },
		{ name: "Mato Grosso", sigla: "MT" },
		{ name: "Mato Grosso do Sul", sigla: "MS" },
		{ name: "Minas Gerais", sigla: "MG" },
		{ name: "Pará", sigla: "PA" },
		{ name: "Paraíba", sigla: "PB" },
		{ name: "Paraná", sigla: "PR" },
		{ name: "Pernambuco", sigla: "PE" },
		{ name: "Piauí", sigla: "PI" },
		{ name: "Rio de Janeiro", sigla: "RJ" },
		{ name: "Rio Grande do Norte", sigla: "RN" },
		{ name: "Rio Grande do Sul", sigla: "RS" },
		{ name: "Rondônia", sigla: "RO" },
		{ name: "Roraima", sigla: "RR" },
		{ name: "Santa Catarina", sigla: "SC" },
		{ name: "São Paulo", sigla: "SP" },
		{ name: "Sergipe", sigla: "SE" },
		{ name: "Tocantins", sigla: "TO" },
	];
};
