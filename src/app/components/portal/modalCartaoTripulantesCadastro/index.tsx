import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import styles from "./styles.module.scss";
//import PrimeButton from "../button/index";
import { Button } from "primereact/button";
import Image from "next/image";
import CtsIcon from "/public/images/ctsIcon.svg";
import { Dropdown } from "primereact/dropdown";
//import Button from "../button/index";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { useToast } from "@/hooks/useToast";

interface Tripulante {
	Categoria: string;
	Nivel: string;
	Quantidade: number;
	id: number;
	CTSId: number;
	Tipo_de_Tripulante?: string;
}

interface CTS {
	CTS_controle?: number;
	Embarcacao: string;
	Data_emissao?: string;
	tripulanteCTS: Tripulante[];
	embarcacao: Embarcacao;
}

interface ModalCTSCadastroProps {
	onClose: () => void;
	onSuccess: () => void;
	cts?: CTS | null;
}

interface Embarcacao {
	Inscricao: string;
	Embarcacao: string;
}

const ModalCTSCadastro: React.FC<ModalCTSCadastroProps> = ({
	onClose,
	onSuccess,
	cts,
}) => {
	const [novoCTS, setNovoCTS] = useState<CTS>({
		Embarcacao: "",
		Data_emissao: "",
		tripulanteCTS: [],
		embarcacao: {
			Inscricao: "",
			Embarcacao: "",
		},
	});

	const [novoTripulante, setNovoTripulante] = useState<Tripulante>({
		Tipo_de_Tripulante: "",
		Categoria: "",
		Nivel: "",
		CTSId: 0,
		id: 0,
		Quantidade: 0,
	});

	const [novaEmbarcacao, setNovaEmbarcacao] = useState<Embarcacao>({
		Inscricao: "",
		Embarcacao: "",
	});

	const [editing, setEditing] = useState(false);
	const [embarcacoes, setEmbarcacoes] = useState<Embarcacao[]>([]);
	const [error, setError] = useState<string | null>(null);
	const tipoDeTripulante = [
		{ id: 1, name: "Comandante" },
		{ id: 2, name: "Imediato" },
		{ id: 3, name: "Oficial da Náutiva" },
		{ id: 4, name: "Rádio Operador" },
		{ id: 5, name: "Contramestre" },
		{ id: 6, name: "Chefe de Máquinas" },
		{ id: 7, name: "Subchefe de Máquinas" },
		{ id: 8, name: "Oficial de Máquinas" },
		{ id: 9, name: "Condutor" },
		{ id: 10, name: "Eletricista" },
		{ id: 11, name: "Enfermeiro/Auxíliar de Saúde" },
		{ id: 12, name: "Cozinheiro" },
		{ id: 13, name: "Taifeiro" },
		{ id: 14, name: "Marinheiro de Máquinas" },
		{ id: 15, name: "Marinheiro de Convés" },
		{ id: 16, name: "Moço de Convés" },
		{ id: 17, name: "Moço de Máquinas" },
	];

	const handleCTSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNovoCTS((prevCTS) => ({
			...prevCTS,
			[name]: value,
		}));
	};

	const {showToast} = useToast();

	const addTripulante = () => {
		if (!novoTripulante.Tipo_de_Tripulante) {
			setError("Selecione um tipo de tripulante!"); // Mostra o erro no Dropdown
			showToast("Erro", "Selecione um tipo de tripulante!", "error"); //Mostra o erro em Modal em cima
			return;
		}
		const tripulanteExists = novoCTS.tripulanteCTS.some(
			(tripulante) =>
				tripulante.Tipo_de_Tripulante === novoTripulante.Tipo_de_Tripulante
		);

		if (tripulanteExists) {
			setError("Tripulante já existente!");
			showToast("Erro", "Tripulante já existe, verifique a lista!", "error");
		} else {
			setError(null);
			setNovoCTS((prevCTS) => ({
				...prevCTS,
				tripulanteCTS: [...(prevCTS.tripulanteCTS || []), novoTripulante],
			}));
			setNovoTripulante({
				Tipo_de_Tripulante: "",
				Categoria: "",
				Nivel: "",
				CTSId: 0,
				id: 0,
				Quantidade: 0,
			});
		}
	};

	const sortedTripulantes = novoCTS.tripulanteCTS;

	const removeTripulante = async (tipo: string, index: number) => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("Token não encontrado.");
			return;
		}

		// Atualiza o estado removendo o tripulante pelo índice
		setNovoCTS((prevCTS) => ({
			...prevCTS,
			tripulanteCTS: prevCTS.tripulanteCTS?.filter((_, i) => i !== index),
		}));

		if (cts) {
			try {
				// Busca o tripulante pelo tipo
				const tripulante = novoCTS.tripulanteCTS?.find(
					(tripulante) => tripulante.Tipo_de_Tripulante === tipo
				);

				if (tripulante?.id) {
					// Faz a chamada à API para deletar o tripulante
					const response = await axios.delete(
						"/api/portal/tripulantesCTS/deleteCtsCrew",
						{
							params: { Id: tripulante.id },
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					console.log(response.data);
				} else {
					console.warn("Tripulante não encontrado ou sem ID.");
				}
			} catch (error) {
				console.error("Erro ao deletar o tripulante selecionado.", error);
			}
		}
	};

	useEffect(() => {
		const fetchEmbarcacoes = async () => {
			const token = localStorage.getItem("token");

			try {
				const responseEmbarcacoes = await axios.get(
					"/api/portal/embarcacao/readVessel",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const embarcacoesLimpas = responseEmbarcacoes.data
					.map((embarcacao: any) => ({
						...embarcacao,
						Embarcacao: embarcacao.Embarcacao.replace(/"/g, ""), // Remove todas as aspas duplas
					}))
					.sort((a: any, b: any) => a.Embarcacao.localeCompare(b.Embarcacao));
				setEmbarcacoes(embarcacoesLimpas);
				const responseTripulantes = await axios.get(
					"/api/portal/tripulantes/readCrew",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} catch (error) {
				console.error("Erro ao buscar embarcação.", error);
			}
		};
		fetchEmbarcacoes();
		if (cts) {
			console.log(cts);
			setNovoCTS(cts);
			const sortedTripulantes = novoCTS.tripulanteCTS;
			setEditing(true);
		} else {
			setNovoCTS({
				CTS_controle: undefined,
				Embarcacao: "",
				Data_emissao: "",
				tripulanteCTS: [],
				embarcacao: {
					Inscricao: "",
					Embarcacao: "",
				},
			});
			setEditing(false);
		}
	}, [cts]);

	const [loading, setLoading] = useState(false);
	const [ctsErrors, setctsErrors] = useState<{ [key: string]: boolean }>({});
	const validateFields = () => {
		const newErrors: { [key: string]: boolean } = {};

		if (!novoCTS.Embarcacao) newErrors.Empresa = true;
		if (!novoCTS.Data_emissao) newErrors.Endereco = true;
		if (!novoCTS.tripulanteCTS) newErrors.Num = true;

		setctsErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateFields()) {
			return showToast("erro", "Por favor, preencha todos os campos obrigatórios.", "error");
		} else {
			setLoading(true);

			const token = localStorage.getItem("token");
			const url = cts
				? "/api/portal/cts/updateCrewCard"
				: "/api/portal/cts/createCrewCard";
			const method = cts ? "put" : "post";

			try {
				const { embarcacao, ...novoCTSSemEmbarcacao } = novoCTS;
				console.log(novoCTSSemEmbarcacao);
				const res = await axios({
					method,
					url,
					data: novoCTSSemEmbarcacao,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setLoading(false);

				onSuccess();
			} catch (error) {
				showToast("Erro", "Erro ao salvar o CTS:", "error");
			}
		}
	};

	const handleTripulanteEditChange = (
		index: number,
		field: string,
		value: any
	) => {
		setNovoTripulante((prevTripulante) => ({
			...prevTripulante,
			[field]: field === "Quantidade" ? Number(value) : value,
		}));

		setNovoCTS((prevCTS) => {
			const updatedTripulantes = [...prevCTS.tripulanteCTS];
			updatedTripulantes[index] = {
				...updatedTripulantes[index],
				[field]: field === "Quantidade" ? Number(value) : value,
			};
			return {
				...prevCTS,
				tripulanteCTS: updatedTripulantes,
			};
		});
	};

	const handleDropdownChange = (e: any, name: string) => {
		const { value } = e;
		console.log(value);

		const embarcacaoCts = embarcacoes.find(
			(embarcacao) => embarcacao.Inscricao === value
		);

		if (embarcacaoCts) {
			setNovoCTS((prevCTS) => ({
				...prevCTS,
				[name]: value,
				embarcacao: embarcacaoCts,
			}));
		} else {
			// Trate o caso onde embarcacaoCts é undefined, se necessário
			console.warn("Embarcação não encontrada.");
		}
	};

	return (
		<>
			<Dialog
				visible={true}
				closable={false}
				onHide={onClose}
				headerClassName={styles.modal}
				contentClassName={styles.modal}
			>
				{/* <ToastContainer /> */}
				<div className={styles.form}>
					<div className={styles.title}>
						<Image src={CtsIcon} alt="Logo" />
						{cts ? (
							<a>Editar Cartao de Tripulação de Segurança</a>
						) : (
							<a>Novo Cartao de Tripulação de Segurança</a>
						)}
					</div>
					<div className={styles.informacoes}>
						{/* TITULO INFORMACOES */}
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Informações</div>
							<div className={styles.linha}></div>
						</div>
						{/* EMBARCAÇÃO E DATA DE EMISSÃO */}
						<div className={styles.embarcacaoCategoria}>
							<div className={styles.opcao}>
								<a>Embarcação:</a>
								<Dropdown
									placeholder="Selecione a Embarcação"
									id="embarcacaoDropDown"
									name="Embarcacao"
									value={novoCTS.Embarcacao}
									optionLabel="Embarcacao"
									optionValue="Inscricao"
									className={`${styles.inputText} ${
										ctsErrors.Embarcacao ? styles.error : ""
									}`}
									options={embarcacoes}
									onChange={(e) => handleDropdownChange(e, "Embarcacao")}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Data de Emissão:</a>
								<InputText
									placeholder="DD/MM/YYYY"
									id="data_emissao"
									name="Data_emissao"
									value={novoCTS.Data_emissao || ""}
									className={`${styles.inputText} ${
										ctsErrors.Data_emissao ? styles.error : ""
									}`}
									onChange={handleCTSChange}
								/>
							</div>
						</div>
						{/* TITULO TRIPULANTES */}
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Tripulantes</div>
							<div className={styles.linha}></div>
						</div>
						{/* NOVO TRIPULANTE */}
						<div className={styles.nivelQuantidade}>
							<div className={styles.opcao}>
								<a>Tipo de Tripulante:</a>

								<Dropdown
									id="categoria"
									value={tipoDeTripulante.find(
										(cat) => cat.name === novoTripulante.Tipo_de_Tripulante
									)}
									options={tipoDeTripulante}
									optionLabel="name"
									className={`${styles.inputText} ${
										ctsErrors.Tipo_de_Tripulante ? styles.error : ""
									}`}
									onChange={(e) => {
										setNovoTripulante((prevTripulante) => ({
											...prevTripulante,
											Tipo_de_Tripulante: e.value.name,
										}));
									}}
								/>
								{error && <div className={styles.errorMessage}>{error}</div>}
							</div>

							<Button
								
								icon=" pi pi-plus-circle"
								label="Adicionar"
								onClick={addTripulante}
								
								
							/>
						</div>

						{/* LISTA DE TRIPULANTES */}
						{novoCTS.tripulanteCTS && (
							<div className={styles.listaTripulantes}>
								{sortedTripulantes.length > 0 ? (
									<DataTable
										value={novoCTS.tripulanteCTS}
										showGridlines={true}
										tableStyle={{ maxWidth: "49em" }}
										className={`${styles.tabela} ${styles["rounded-datatable"]}`}
									>
										<Column
											field="Tipo_de_Tripulante"
											header="Tipo de Tripulante"
											headerClassName={styles.firstHeader}
											bodyStyle={{
												border: "none",
												font: "10px",
												padding: "0 0.25em 0 0",
												height: "auto",
											}}
											body={(rowData, { rowIndex }) => (
												<InputText
													value={rowData.Tipo_de_Tripulante}
													onChange={(e) =>
														handleTripulanteEditChange(
															rowIndex,
															"Tipo_de_Tripulante",
															e.target.value
														)
													}
													className={styles.inputTableTripulantes}
													disabled
												/>
											)}
										/>
										<Column
											field="Categoria"
											header="Categoria"
											body={(rowData, options) => (
												<InputText
													value={rowData.Categoria}
													className={styles.inputTableTripulantes}
													onChange={(e) =>
														handleTripulanteEditChange(
															options.rowIndex,
															"Categoria",
															e.target.value
														)
													}
												/>
											)}
											headerClassName={styles.firstHeader}
											bodyStyle={{
												border: "none",
												font: "10px",
												padding: "0 0.25em 0 0.25em",
												height: "auto",
											}}
										/>
										<Column
											field="Nivel"
											header="Nível"
											body={(rowData, options) => (
												<InputText
													value={rowData.Nivel}
													className={styles.inputTableTripulantes}
													onChange={(e) =>
														handleTripulanteEditChange(
															options.rowIndex,
															"Nivel",
															e.target.value
														)
													}
												/>
											)}
											headerClassName={styles.firstHeader}
											bodyStyle={{
												border: "none",
												font: "10px",
												padding: "0 0.25em 0 0.25em",
												height: "auto",
											}}
										/>
										<Column
											field="Quantidade"
											header="Quantidade"
											body={(rowData, options) => (
												<InputText
													value={rowData.Quantidade}
													className={styles.inputTableTripulantes}
													onChange={(e) =>
														handleTripulanteEditChange(
															options.rowIndex,
															"Quantidade",
															e.target.value
														)
													}
												/>
											)}
											headerClassName={styles.firstHeader}
											bodyStyle={{
												border: "none",
												font: "10px",
												padding: "0 0.25em 0 0.25em",
												height: "auto",
											}}
										/>
										<Column
											body={(rowData, options) => (
												<i
													className={`pi pi-trash ${styles["icon-bold"]}`}
													onClick={() =>
														removeTripulante(
															rowData.Tipo_de_Tripulante,
															options.rowIndex
														)
													}
												></i>
											)}
											bodyStyle={{
												border: "none",
												font: "10px",
												padding: "0 0 0 0.25em",
												height: "auto",
											}}
											headerStyle={{
												textAlign: "left",
												alignContent: "center",
												backgroundColor: "white",
												width: "4em",
												color: "black",
												border: "none",
											}}
										/>
										{sortedTripulantes.length <= 0 && <tr></tr>}
									</DataTable>
								) : (
									""
								)}
							</div>
						)}
					</div>
					{/* BOTÕES */}
					<div className={styles.botoes}>
						<Button
							label="Cancelar"
							onClick={onClose}

						/>
						{/* {loading == true ? (
							<Button
								
								label={
									<ProgressSpinner
										style={{ width: "20px", height: "20px" }}
										strokeWidth="8"
										animationDuration=".5s"
									/>
								}
								disabled
								
							/>
						) : (
							<Button
								
								label={editing ? "Atualizar" : "Salvar"}
								onClick={handleSubmit}
								
							/>
						)} */}
						<Button
							label={editing ? "Atualizar" : "Salvar"}
							onClick={onClose}
							loading={loading}

						/>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ModalCTSCadastro;
