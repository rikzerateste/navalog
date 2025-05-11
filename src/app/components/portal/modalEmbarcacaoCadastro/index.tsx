import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber"; // Importando o InputNumber
import styles from "./styles.module.scss";
import axios from "axios";
import Image from "next/image";
import Ancora from "/public/images/ancora.svg";
import PrimeButton from "../button/index";
import { ToastContainer, toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";

interface Empresa {
	Codigo: number;
	Empresa: string;
	// Outros campos relevantes da empresa
}
// NAO OBRIGATORIOS SAO OS DE ?????????????????????? NA FRENTE DO NOME
interface Embarcacao {
	Inscricao: string;
	Embarcacao: string;
	Arqueacao_Bruta?: string;
	Registro_Tribunal_Maritimo?: string;
	Seguro?: string;
	Tonelagem_porte_bruto?: string;
	Tonelagem_porte_liquido?: string;
	Observacao?: string;
	Navegacao?: string;
	Id_propulsao?: number;
	Atividade?: string;
	Comprimento_Total?: string;
	Empresa?: number; // Adicionando o atributo Empresa como número (ID)
}

interface ModalEmbascacoesCadastroProps {
	onClose: () => void;
	onSuccess: (text: string) => void;
	embarcacao?: Embarcacao | null;
}
interface Navegacao {
	Codigo_da_area_de_navegacao: String;
	Descricao: String;
	embarcacao: Embarcacao[];
}
interface Propulsao {
	Id_propulsao: number;
	Descricao?: String;
	embarcacao: Embarcacao[];
}

interface Atividade {
	Tipo_de_atividade: String;
	Descricao: String;
	embarcacao: Embarcacao[];
}

const ModalEmbascacoesCadastro: React.FC<ModalEmbascacoesCadastroProps> = ({
	onClose,
	onSuccess,
	embarcacao,
}) => {
	const [visible, setVisible] = useState(false);
	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	const [novaEmbarcacao, setNovaEmbarcacao] = useState<Embarcacao>({
		Inscricao: "",
		Embarcacao: "",
		Arqueacao_Bruta: "",
		Registro_Tribunal_Maritimo: "",
		Seguro: "",
		Tonelagem_porte_bruto: "",
		Tonelagem_porte_liquido: "",
		Observacao: "",
		Navegacao: "",
		Id_propulsao: undefined,
		Atividade: "",
		Comprimento_Total: "",
		Empresa: undefined, // Inicialmente nenhum selecionado
	});
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

	const [navegacao, setNavegacao] = useState<Navegacao[]>([]);
	const [propulsao, setPropulsao] = useState<Propulsao[]>([]);
	const [atividade, setAtividade] = useState<Atividade[]>([]);

	useEffect(() => {
		const token = localStorage.getItem("token"); // ou obtenha o token de onde você está armazenando

		const fetchPropulsao = async () => {
			try {
				const response = await axios.get(
					"/api/portal/propulsao/readPropulsao",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setPropulsao(response.data);
				console.log(propulsao);
			} catch (error) {
				console.error("Erro ao buscar:", error);
			}
		};

		const fetchNavegacao = async () => {
			try {
				const response = await axios.get(
					"/api/portal/navegacao/readNavegacao",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setNavegacao(response.data);
			} catch (error) {
				console.error("Erro ao buscar:", error);
			}
		};

		const fetchAtividade = async () => {
			try {
				const response = await axios.get(
					"/api/portal/atividade/readAtividade",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setAtividade(response.data);
			} catch (error) {
				console.error("Erro ao buscar:", error);
			}
		};

		const fetchEmpresas = async () => {
			try {
				const response = await axios.get(
					"/api/portal/empresa/readCompanyTeste",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setEmpresas(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Erro ao buscar:", error);
			}
		};

		fetchEmpresas();
		fetchAtividade();
		fetchNavegacao();
		fetchPropulsao();
		console.log(propulsao);
	}, []);

	const [selectedEmpresa, setSelectedEmpresa] = useState();
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (embarcacao) {
			setLoading(true);

			setNovaEmbarcacao(embarcacao);
			// setSelectedEmpresa(estados.find((estado) => estado.sigla === empresa.UF) || null);
			setEditing(true); // Está editando
		} else {
			setNovaEmbarcacao({
				Inscricao: "",
				Embarcacao: "",
				Arqueacao_Bruta: "",
				Registro_Tribunal_Maritimo: "",
				Seguro: "",
				Tonelagem_porte_bruto: "",
				Tonelagem_porte_liquido: "",
				Observacao: "",
				Navegacao: "",
				Id_propulsao: undefined,
				Atividade: "",
				Comprimento_Total: "",
				Empresa: undefined,
			});
			setSelectedEmpresa(undefined);
			setEditing(false); // Não está editando
		}
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [embarcacao]);

	const validateFields = () => {
		const newErrors: { [key: string]: boolean } = {};

		if (!novaEmbarcacao.Inscricao) newErrors.Inscricao = true;
		if (!novaEmbarcacao.Embarcacao) newErrors.Embarcacao = true;
		//if (!novaEmbarcacao.Arqueacao_Bruta) newErrors.Arqueacao_Bruta = true;
		if (!novaEmbarcacao.Empresa) newErrors.Empresa = true;
		if (!novaEmbarcacao.Navegacao) newErrors.Navegacao = true;
		if (!novaEmbarcacao.Id_propulsao) newErrors.Id_propulsao = true;
		if (!novaEmbarcacao.Atividade) newErrors.Atividade = true;
		//if (!novaEmbarcacao.Comprimento_Total) newErrors.Comprimento_Total = true;
		//if (!novaEmbarcacao.Registro_Tribunal_Maritimo) newErrors.Registro_Tribunal_Maritimo = true;
		//if (!novaEmbarcacao.Seguro) newErrors.Seguro = true;
		//if (!novaEmbarcacao.Tonelagem_porte_bruto) newErrors.Tonelagem_porte_bruto = true;
		//if (!novaEmbarcacao.Tonelagem_porte_liquido) newErrors.Tonelagem_porte_liquido = true;

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setNovaEmbarcacao((prevEmbarcacao) => ({
			...prevEmbarcacao,
			[name]: value,
		}));
	};
	const handleChangeNumber = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const numericValue = value.replace(/[^0-9.]/g, "");

		setNovaEmbarcacao((prev) => ({
			...prev,
			[name]: numericValue || 0,
		}));

		// Limpe o erro
		setErrors((prev) => ({
			...prev,
			[name]: false,
		}));
	};
	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const handleSubmit = async () => {
		if (!validateFields()) {
			return toast.error("Por favor, preencha todos os campos obrigatórios.");
		}

		setLoadingSubmit(true);
		const token = localStorage.getItem("token");
		const url = embarcacao
			? "/api/portal/embarcacao/updateVessel"
			: "/api/portal/embarcacao/createVessel";
		const method = embarcacao ? "put" : "post";

		try {
			const res = await axios[method](url, novaEmbarcacao, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (method === "put") {
				setLoadingSubmit(false);

				onSuccess("Embarcação atualizada com sucesso.");
			} else {
				// Verificar para mandar diferente quando atualizaar
				setLoadingSubmit(false);

				onSuccess("Embarcação criada com sucesso");
			}
		} catch (error) {
			setLoadingSubmit(false);

			toast.error("Erro ao cadastrar a embarcação, preencha os campos!");
		}
	};
	const criarEmbarcacao = async () => {
		try {
			console.log("Enviando dados para o backend:", novaEmbarcacao);
			const res = await axios.post(
				"/api/portal/embarcacao/createVessel",
				novaEmbarcacao
			);
			setNovaEmbarcacao({
				Inscricao: "",
				Embarcacao: "",
				Arqueacao_Bruta: "",
				Registro_Tribunal_Maritimo: "",
				Seguro: "",
				Tonelagem_porte_bruto: "",
				Tonelagem_porte_liquido: "",
				Observacao: "",
				Navegacao: "",
				Id_propulsao: undefined,
				Atividade: "",
				Comprimento_Total: "",
				Empresa: undefined,
			});
			setVisible(false);
		} catch (error: any) {
			console.error("Erro ao adicionar a nova embarcação:", error);
			alert(
				`Erro ao adicionar a nova embarcação: ${
					error.response?.data?.error || error.message
				}`
			);
		}
	};
	const modalHeader = editing ? "Editar Embarcação" : "Cadastrar Embarcação";

	return (
		<>
			<Dialog
				visible={true}
				closable={false}
				onHide={onClose}
				headerClassName={styles.modal}
				contentClassName={styles.modal}
			>
				<div className={styles.form}>
					<div className={styles.title}>
						<Image src={Ancora} alt="Logo" />
						{embarcacao ? <a>Editar Embarcação</a> : <a>Nova Embarcação</a>}
					</div>
					{/* INFORMACOES  */}
					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Informações</div>
							<div className={styles.linha}></div>
						</div>

						<div className={styles.embarcacaoEmpresa}>
							<div className={styles.opcao}>
								<a>Embarcação:</a>
								<InputText
									id="embarcacao"
									name="Embarcacao"
									value={novaEmbarcacao.Embarcacao}
									className={`${styles.inputText} ${
										errors.Embarcacao ? styles.error : ""
									}`}
									onChange={handleChange}
								/>
							</div>
							<div>
								<div className={styles.opcao}>
									<a>Inscrição:</a>
									<InputText
										id="inscricao"
										name="Inscricao"
										value={novaEmbarcacao.Inscricao}
										className={`${styles.inputText} ${
											errors.Inscricao ? styles.error : ""
										}`}
										onChange={handleChange}
										disabled={embarcacao ? true : false}
									/>
								</div>
							</div>
						</div>
						<div className={styles.opcao}>
							<a>Empresa:</a>
							<Dropdown
								id="empresaDropdown"
								name="Empresa"
								optionLabel="Empresa"
								optionValue="Codigo"
								value={novaEmbarcacao.Empresa}
								options={empresas}
								className={`${styles.inputText} ${
									errors.Empresa ? styles.error : ""
								}`}
								onChange={(e) =>
									setNovaEmbarcacao((prevEmbarcacao) => ({
										...prevEmbarcacao,
										Empresa: e.value,
									}))
								}
							/>
							{loading ? (
								<div className={styles["spinner-container"]}>
									<ProgressSpinner
										style={{ width: "20px", height: "20px" }}
										strokeWidth="8"
										fill="var(--surface-ground)"
										animationDuration=".5s"
									/>
								</div>
							) : (
								""
							)}
						</div>
					</div>

					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Características</div>
							<div className={styles.linha}></div>
						</div>
						<div className={styles.navPropulsaoAtvd}>
							<div className={styles.opcao}>
								<a>Navegação:</a>
								<Dropdown
									id="navegacao"
									name="Navegacao"
									optionLabel="Descricao"
									optionValue="Codigo_da_area_de_navegacao"
									value={novaEmbarcacao.Navegacao}
									options={navegacao}
									className={`${styles.inputText} ${
										errors.Navegacao ? styles.error : ""
									}`}
									onChange={(e) =>
										setNovaEmbarcacao((prevEmbarcacao) => ({
											...prevEmbarcacao,
											Navegacao: e.value,
										}))
									}
								/>
								{loading ? (
									<div className={styles["spinner-container"]}>
										<ProgressSpinner
											style={{ width: "20px", height: "20px" }}
											strokeWidth="8"
											fill="var(--surface-ground)"
											animationDuration=".5s"
										/>
									</div>
								) : (
									""
								)}
							</div>

							<div className={styles.opcao}>
								<a>Propulsão:</a>
								<Dropdown
									id="idPropulsao"
									name="Id_propulsao"
									optionLabel="Descricao"
									optionValue="Id_propulsao"
									value={novaEmbarcacao.Id_propulsao}
									options={propulsao}
									className={`${styles.inputText} ${
										errors.Id_propulsao ? styles.error : ""
									}`}
									onChange={(e) =>
										setNovaEmbarcacao((prevEmbarcacao) => ({
											...prevEmbarcacao,
											Id_propulsao: e.value,
										}))
									}
								/>
								{loading ? (
									<div className={styles["spinner-container"]}>
										<ProgressSpinner
											style={{ width: "20px", height: "20px" }}
											strokeWidth="8"
											fill="var(--surface-ground)"
											animationDuration=".5s"
										/>
									</div>
								) : (
									""
								)}
							</div>

							<div className={styles.opcao}>
								<a>Atividade:</a>
								<Dropdown
									id="atividade"
									name="Atividade"
									optionLabel="Descricao"
									optionValue="Tipo_de_atividade"
									value={novaEmbarcacao.Atividade}
									options={atividade}
									className={`${styles.inputText} ${
										errors.Atividade ? styles.error : ""
									}`}
									onChange={(e) =>
										setNovaEmbarcacao((prevEmbarcacao) => ({
											...prevEmbarcacao,
											Atividade: e.value,
										}))
									}
								/>
								{loading ? (
									<div className={styles["spinner-container"]}>
										<ProgressSpinner
											style={{ width: "20px", height: "20px" }}
											strokeWidth="8"
											fill="var(--surface-ground)"
											animationDuration=".5s"
										/>
									</div>
								) : (
									""
								)}
							</div>
						</div>
					</div>
					{/* ESPECIFICACOES */}
					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Especificações</div>
							<div className={styles.linha}></div>
						</div>

						<div className={styles.arqToneComprimento}>
							<div className={styles.opcao}>
								<a>Arqueação Bruta:</a>
								<InputText
									id="arqueacaoBruta"
									name="Arqueacao_Bruta"
									value={novaEmbarcacao.Arqueacao_Bruta}
									className={`${styles.inputText} ${
										errors.Arqueacao_Bruta ? styles.error : ""
									}`}
									onChange={handleChange}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Tonelem Porte Bruto:</a>
								<InputText
									id="tonelagemBruto"
									name="Tonelagem_porte_bruto"
									value={novaEmbarcacao.Tonelagem_porte_bruto}
									className={`${styles.inputText} ${
										errors.Tonelagem_porte_bruto ? styles.error : ""
									}`}
									onChange={handleChangeNumber}
								/>
							</div>

							<div className={styles.opcao}>
								<a>Comprimento Total:</a>
								<InputText
									id="comprimentoTotal"
									name="Comprimento_Total"
									value={novaEmbarcacao.Comprimento_Total}
									className={`${styles.inputText} ${
										errors.Comprimento_Total ? styles.error : ""
									}`}
									onChange={handleChangeNumber}
								/>
							</div>
						</div>

						<div className={styles.tonelagemLiquidaObservacao}>
							<div className={styles.opcao}>
								<a>Tonelagem Porte Líquido:</a>
								<InputText
									id="tonelagemLiquido"
									name="Tonelagem_porte_liquido"
									value={novaEmbarcacao.Tonelagem_porte_liquido}
									className={`${styles.inputText} ${
										errors.Tonelagem_porte_liquido ? styles.error : ""
									}`}
									onChange={handleChangeNumber}
								/>
							</div>

							<div className={styles.opcao}>
								<a>Observação:</a>
								<InputText
									id="observacao"
									name="Observacao"
									value={novaEmbarcacao.Observacao}
									className={`${styles.inputText} ${
										errors.Observacao ? styles.error : ""
									}`}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className={styles.tribunalMaritimoTonelagemLiquindo}>
							<div className={styles.opcao}>
								<a>Registro Tribunal Marítimo:</a>
								<InputText
									id="registroTribunal"
									name="Registro_Tribunal_Maritimo"
									value={novaEmbarcacao.Registro_Tribunal_Maritimo}
									className={`${styles.inputText} ${
										errors.Registro_Tribunal_Maritimo ? styles.error : ""
									} `}
									onChange={handleChange}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Seguro:</a>
								<InputText
									id="seguro"
									name="Seguro"
									value={novaEmbarcacao.Seguro}
									className={`${styles.inputText} ${
										errors.Seguro ? styles.error : ""
									} `}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className={styles.botoes}>
						<PrimeButton
							tipoBotao="cancelar"
							title="Cancelar"
							onClick={onClose}
							tamanho="10em"
						/>
						{loadingSubmit == true ? (
							<PrimeButton
								tipoBotao="normal"
								title={
									<ProgressSpinner
										style={{ width: "20px", height: "20px" }}
										strokeWidth="8"
										animationDuration=".5s"
									/>
								}
								tamanho="10em"
							/>
						) : (
							<PrimeButton
								tipoBotao="normal"
								title={editing ? "Atualizar" : "Salvar"}
								disabled={loading}
								onClick={handleSubmit}
								tamanho="10em"
							/>
						)}
					</div>
				</div>
			</Dialog>
			<ToastContainer />
		</>
	);
};

export default ModalEmbascacoesCadastro;
