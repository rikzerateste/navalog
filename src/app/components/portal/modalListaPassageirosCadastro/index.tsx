import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import styles from "./styles.module.scss";
/* import PrimeButton from "../button/index";
import Button from "../button/index"; */
import Image from "next/image";
import ListaPassageirosIcon from "/public/images/ListaDePassageiros-Icon.svg";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
/* import { ToastContainer, toast } from "react-toastify"; */
//import "react-toastify/dist/ReactToastify.css";
import { componentsToColor } from "pdf-lib";
import { Dialog } from "primereact/dialog";
/* import ButtonCustom from "../button"; */
import { headers } from "next/headers";
import { useToast } from "@/hooks/useToast";
import { Button } from "primereact/button";

interface LPE {
	Controle?: number;
	Companhia_Agente?: string;
	Embarcacao: string;
	embarcacao?: Embarcacao;
	Porto_de_chegada_e_partida?: string;
	Porto_de_procedencia?: string;
	Data_emissao?: string;
	Lpe_obs1?: string;
	Comandante?: string;
	lped?: LPED[];
	lpecomboio?: LPEComboio[];
}
// Tirar Lista de Comboio
interface LPEComboio {
	Controle?: number;
	Lista?: number;
	Embarcacao: string;
	embarcacao?: Embarcacao;
	isNew?: boolean; // Adicione a propriedade isNew
}

interface LPED {
	Controle?: number;
	Lista?: number;
	Documento?: string;
	Identificacao?: string;
	Nome?: string;
	pessoal: Pessoal;
	isNew?: boolean; // Adicione esta propriedade
}

interface Empresa {
	Codigo: number;
	Empresa: string;
}

interface Embarcacao {
	Inscricao?: string;
	Embarcacao?: string;
	Empresa?: Empresa;
	lpe?: LPE[];
	lpecomboio?: LPEComboio[];
}

interface Tripulante {
	Documento: string;
	Nome: string;
}

interface Pessoal {
	Controle?: number;
	Documento: string;
	Nome: String;
	Funcao?: String;
	Data_de_nascimento?: String;
	Nacionalidade?: number;
	RG?: String;
	lped?: LPED[];
}

interface ModalCadastroEdicaoProps {
	onClose: () => void;
	onSuccess: () => void;
	passageiro?: LPE | null;
}

const ModalCadastroEdicao: React.FC<ModalCadastroEdicaoProps> = ({
	onClose,
	onSuccess,
	passageiro,
}) => {
	const [lpe, setLpe] = useState<LPE>({
		Controle: 0,
		Embarcacao: "",
		Companhia_Agente: "",
		embarcacao: {
			Inscricao: "",
			Embarcacao: "",
			Empresa: {
				Codigo: 0,
				Empresa: "",
			},
		},
		Porto_de_chegada_e_partida: "",
		Porto_de_procedencia: "",
		Data_emissao: "",
		Lpe_obs1: "",
		Comandante: "",
	});
	const [novoLPED, setNovoLPED] = useState<LPED>({
		Controle: 0,
		Lista: 0,
		Documento: "",
		Identificacao: "",
		pessoal: {
			Documento: "",
			Nome: "",
		},
	});
	const [embarcacoes, setEmbarcacoes] = useState<Embarcacao[]>([]);
	const [embarcacoesComboio, setEmbarcacoesComboio] = useState<Embarcacao[]>(
		[]
	);
	const [embarcacaoSelecionada, setEmbarcacaoSelecionada] =
		useState<Embarcacao | null>(null); // Alterado para LPED | null

	const [tripulantes, setTripulantes] = useState<Pessoal[]>([]);
	const [tripulanteSelecionado, setTripulanteSelecionado] =
		useState<Pessoal | null>(null); // Alterado para LPED | null

	const [lpeComboio, setLpeComboio] = useState<LPEComboio>({
		Controle: 0,
		Embarcacao: "",
		Lista: 0,
		embarcacao: {
			Inscricao: "",
			Embarcacao: "",
			Empresa: {
				Codigo: 0,
				Empresa: "",
			},
		},
	});

	// Estado inicial de `lpeComboios`
	const [lpeComboios, setLpeComboios] = useState<LPEComboio[]>([]);

	const [lpeComboiosEdit, setLpeComboiosEdit] = useState<LPEComboio[]>([]);

	const [lpedsEdit, setLpedsEdit] = useState<LPED[]>([]);

	const [lpeds, setLpeds] = useState<LPED[]>([]);
	const [lped, setLped] = useState<LPED>({
		Controle: 0,
		Lista: 0,
		Documento: "",
		Identificacao: "",
		Nome: "",
		pessoal: {
			Documento: "",
			Nome: "",
			// Inclua outros campos necessários ou deixe-os como string vazia ou null
		},
	});

	const [empresa, setEmpresa] = useState<Empresa>({
		Codigo: 0,
		Empresa: "",
	});

	const [embarcacao, setEmbarcacao] = useState<Embarcacao>({});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		const fetchEmbarcacoesETripulantes = async () => {
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
				setEmbarcacoesComboio(embarcacoesLimpas);
				const responseTripulantes = await axios.get(
					"/api/portal/tripulantes/readCrew",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const tripulantesLimpos = responseTripulantes.data
					.map((tripulante: any) => ({
						...tripulante,
						Nome: tripulante.Nome.replace(/"/g, ""), // Remove todas as aspas duplas
					}))
					.sort((a: any, b: any) => a.Nome.localeCompare(b.Nome));

				setTripulantes(tripulantesLimpos);
				console.error(tripulantesLimpos);
				console.log(lped);
			} catch (error) {
				console.error("Erro ao buscar embarcação ou tripulante.");
			}
		};

		fetchEmbarcacoesETripulantes();
		if (passageiro) {
			console.log(passageiro);
			setLoadingSubmit(true);
			setLpeComboiosLocal(passageiro.lpecomboio || []);
			setLpedsLocal(passageiro.lped || []);
			setLpeComboios(passageiro.lpecomboio || []);
			setLpeds(passageiro.lped || []);
			setLpe(passageiro);
			fillCompanyAndLpedOnEdit(passageiro);
			setLoadingSubmit(false);
		} else {
			setLpe({
				Controle: 0,
				Embarcacao: "",
				Companhia_Agente: "",
				embarcacao: {
					Inscricao: "",
					Embarcacao: "",
					Empresa: {
						Codigo: 0,
						Empresa: "",
					},
				},
				Porto_de_chegada_e_partida: "",
				Porto_de_procedencia: "",
				Data_emissao: "",
				Lpe_obs1: "",
				Comandante: "",
			});
		}
	}, [passageiro]);

	const handleLpeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLpe((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLpeComboioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLpeComboio((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLpedChange = (e: DropdownChangeEvent) => {
		const { value } = e.target;
		setLoading(true);
		const buscaTripulante = tripulantes.find(
			(tripulante) => tripulante.Documento === value
		);
		if (buscaTripulante) {
			setTripulanteSelecionado(buscaTripulante);
		} else {
			setTripulanteSelecionado(null);
		}
		setLoading(false);
	};

	const [listaPassageirosError, setListaPassageirosError] = useState<{
		[key: string]: boolean;
	}>({});
	const validateFields = () => {
		const newErrors: { [key: string]: boolean } = {};

		//if (!lpe.Porto_de_chegada_e_partida) newErrors.Porto_de_chegada_e_partida = true;
		//if (!lpe.Porto_de_procedencia) newErrors.Porto_de_procedencia = true;
		//if (!lpe.Data_emissao) newErrors.Data_emissao = true;
		//if (!lpe.Lpe_obs1) newErrors.Lpe_obs1 = true;
		//if (!lpe.Comandante) newErrors.Comandante = true;
		if (!lpe.Embarcacao) newErrors.Embarcacao = true;

		setListaPassageirosError(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const [error, setError] = useState<string | null>(null);
	const [erroEmbarcacao, setErroEmbarcacao] = useState<string | null>(null);

	const handleComandanteChange = async (e: any, name: string) => {
		const { value } = e.target;
		setLpe((prevDespacho) => ({
			...prevDespacho,
			[name]: value,
		}));
	};

	const [lpeComboiosLocal, setLpeComboiosLocal] = useState<LPEComboio[]>([]);
	const [lpedsLocal, setLpedsLocal] = useState<LPED[]>([]);

	const { showToast } = useToast();

	const handleAddLpeComboio = () => {
		if (embarcacaoSelecionada) {
			const novoComboio = {
				Embarcacao: "",
				Controle: 0,
				Lista: 0,
				embarcacao: {
					Inscricao: embarcacaoSelecionada.Inscricao,
					Embarcacao: embarcacaoSelecionada.Embarcacao,
					Empresa: embarcacaoSelecionada.Empresa,
				},
				isNew: true, // Indica que é um novo item
			};

			// Verifica se o comboio já está na lista
			const comboioExistente = lpeComboiosLocal.some(
				(comboio) =>
					comboio.embarcacao?.Inscricao === novoComboio.embarcacao.Inscricao
			);

			if (!comboioExistente) {
				setLpeComboiosLocal((prev) => {
					const updatedList = [...prev, novoComboio];
					console.log("Novo comboio adicionado:", novoComboio);
					console.log("Lista de comboios atualizada:", updatedList);
					return updatedList;
				});
			} else {
				showToast("Erro", "Comboio já existente!", "error");
			}
		}
	};
	const handleAddLped = () => {
		if (tripulanteSelecionado) {
			const novoLped = {
				pessoal: tripulanteSelecionado,
				isNew: true, // Indica que é um novo item
			};

			// Verifica se o Lped já está na lista
			const lpedExistente = lpedsLocal.some(
				(lped) => lped.pessoal.Documento === novoLped.pessoal.Documento
			);

			if (!lpedExistente) {
				setLpedsLocal((prev) => [...prev, novoLped]);
			} else {
				setError("Tripulante já existente!");

				showToast("Erro", "Tripulante já existente!", "error");
			}
		}
	};

	const handleRemoveLpeComboio = (inscricao: string) => {
		setLpeComboiosLocal((prev) => {
			// Filtra a lista para remover o item com a inscrição correspondente
			const filteredList = prev.filter(
				(comboio) => comboio.embarcacao?.Inscricao !== inscricao
			);

			console.log("Removido comboio com inscrição:", inscricao);
			console.log("Lista de comboios após remoção:", filteredList);

			return filteredList;
		});
	};

	const handleRemoveLped = (documento: string) => {
		setLpedsLocal((prev) =>
			prev.filter((lped) => lped.pessoal.Documento !== documento)
		);
	};

	const handleEmbarcacaoChange = async (e: any, name: string) => {
		const { value } = e.target;
		setLoading(true);
		const buscaEmbarccao = embarcacoesComboio.find(
			(embarcacoesComboio) => embarcacoesComboio.Inscricao === value
		);
		if (buscaEmbarccao) {
			setEmbarcacaoSelecionada(buscaEmbarccao);
		} else {
			setEmbarcacaoSelecionada(null);
		}
		setLoading(false);
	};

	const fillCompanyAndLpedOnEdit = async (passageiro: LPE) => {
		const token = localStorage.getItem("token");

		try {
			const empresa = await axios.get(
				"/api/portal/empresa/getEmpresaByEmbarcacao",
				{
					params: { inscricao: passageiro.Embarcacao },
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setEmbarcacao({
				...passageiro.embarcacao,
				Inscricao: passageiro.Embarcacao,
			});

			setEmpresa(empresa.data);
		} catch (error) {
			console.error("Algo deu errado ao buscar empresa", error);
		}
	};

	const handleDropdownChange = async (e: any, name: string) => {
		const token = localStorage.getItem("token");

		const { value } = e.target;
		setLpe((prevDespacho) => ({
			...prevDespacho,
			[name]: value,
		}));

		setLoading(true);

		// Encontra a embarcação com a inscrição correspondente
		const embarcacaoInscricao = embarcacoes.find(
			(embarcacao) => embarcacao.Inscricao === value
		);

		// Define o estado da embarcação encontrada
		if (embarcacaoInscricao) {
			setEmbarcacao(embarcacaoInscricao);
		} else {
			setEmbarcacao({
				Inscricao: "",
				Embarcacao: "",
				Empresa: {
					Codigo: 0,
					Empresa: "",
				},
			});
		}

		try {
			setLoading(true);
			const responseEmpresa = await axios.get(
				`/api/portal/empresa/getEmpresaByEmbarcacao`,
				{
					params: { inscricao: value },
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setEmpresa(responseEmpresa.data);
			setLoading(false);
		} catch (error) {
			console.error("Erro ao buscar as entidades relacionadas:", error);
		}
		setLoading(false);
	};

	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const handleSubmit = async () => {
		if (!validateFields()) {
			return showToast(
				"Erro",
				"Por favor, preencha todos os campos obrigatórios.",
				"error"
			);
		}

		const token = localStorage.getItem("token");

		try {
			if (passageiro) {
				// Atualizar lista existente
				const embarcacaoUpdate = embarcacoes.find(
					(embarc) => embarc.Inscricao === lpe.Embarcacao
				);

				if (!embarcacaoUpdate) {
					showToast("Erro", "Embarcação não encontrada", "error");
					return;
				}

				const { Embarcacao, ...lpeSemEmbarcacao } = lpe;

				const lpeResponse = await axios.put(
					"/api/portal/listaPassageiros/updatePassengerList",
					{
						...lpeSemEmbarcacao,
						embarcacao: embarcacaoUpdate,
						Controle: passageiro.Controle,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				for (const lpeComboioItem of lpeComboiosLocal) {
					if (lpeComboioItem.isNew) {
						const { Controle, ...lpeComboioSemControle } = lpeComboioItem;
						await axios.post(
							"/api/portal/listaPassageirosComboio/createTrainPassengerList",
							{
								...lpeComboioSemControle,
								Lista: lpeResponse.data.Controle,
							},
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						);
					}
				}

				for (const lpedItem of lpedsLocal) {
					if (lpedItem.isNew) {
						const { Controle, ...lpedSemControle } = lpedItem;
						await axios.post(
							"/api/portal/listaPassageirosLped/createPassengerListLped",
							{
								...lpedSemControle,
								Lista: lpeResponse.data.Controle,
							},
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						);
					}
				}

				onSuccess();
				window.location.reload();
			} else {
				setLoadingSubmit(true);
				const { Controle, ...lpeSemControle } = lpe;
				const lpeResponse = await axios.post(
					"/api/portal/listaPassageiros/createPassengerList",
					{
						...lpeSemControle,
						Embarcacao: lpe.Embarcacao,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				for (const lpeComboioItem of lpeComboiosLocal) {
					if (lpeComboioItem.isNew) {
						const { Controle, Lista, ...lpeComboioSemControle } =
							lpeComboioItem;
						await axios.post(
							"/api/portal/listaPassageirosComboio/createTrainPassengerList",
							{
								...lpeComboioSemControle,
								ListaLpe: lpeResponse.data.Controle,
							},
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						);
					}
				}

				for (const lpedItem of lpedsLocal) {
					if (lpedItem.isNew) {
						const { Controle, ...lpedSemControle } = lpedItem;
						await axios.post(
							"/api/portal/listaPassageirosLped/createPassengerListLped",
							{
								...lpedSemControle,
								Lista: lpeResponse.data.Controle,
							},
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						);
					}
				}

				setLoadingSubmit(false);
				showToast("Sucesso", "Atualizado com sucesso!", "success");
				onClose();
				window.location.reload();
			}
		} catch (error) {
			showToast("Erro", "Erro ao atualizar os dados:", "error");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLpe((prevLpe) => ({
			...prevLpe,
			[name]: value,
		}));
	};

	const renderIconLped = (rowData: any) => {
		return (
			<i
				className={`pi pi-trash ${styles["icon-bold"]}`}
				onClick={() => handleRemoveLped(rowData.pessoal.Documento)}
			></i>
		);
	};

	const renderIconComboio = (rowData: any) => {
		return (
			<i
				className={`pi pi-trash ${styles["icon-bold"]}`}
				onClick={() => handleRemoveLpeComboio(rowData.embarcacao.Inscricao)}
			></i>
		);
	};

	const [visible, setVisible] = useState(false);

	const footerContent = (
		<div className={styles.botao}>
			<p>ola</p>
			{/* <ButtonCustom tipoBotao='cancelar' title="Não" tamanho="10em" onClick={onClose} />
        <ButtonCustom tipoBotao='normal' title="Sim" onClick={logout} tamanho="10em" /> */}
		</div>
	);

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
						<Image src={ListaPassageirosIcon} alt={""}></Image>
						{passageiro ? (
							<a>Editar Lista de Tripulantes</a>
						) : (
							<a>Nova Lista de Tripulantes</a>
						)}
					</div>
					{/* INFORMACOES */}
					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Informações</div>
							<div className={styles.linha}></div>
						</div>

						{/* EMBARCACAO E INSCRICAO */}
						<div className={styles.embarcacaoInscricao}>
							<div className={styles.opcao}>
								<a>Embarcação:</a>
								<Dropdown
									placeholder="Selecione a Embarcação"
									id="embarcacaoDropDown"
									name="embarcacao"
									optionLabel="Embarcacao"
									optionValue="Inscricao"
									value={lpe.Embarcacao}
									options={embarcacoes}
									className={`${styles.inputText} ${
										listaPassageirosError.Embarcacao ? styles.error : ""
									}`}
									onChange={(e) => handleDropdownChange(e, "Embarcacao")}
									disabled={passageiro ? true : false}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Inscrição:</a>
								<InputText
									id="inscricao"
									name="Inscricao"
									value={embarcacao.Inscricao}
									className={styles.inputText}
									onChange={handleChange}
									disabled
								/>
							</div>
						</div>
						{/* EMPRESA */}
						<div className={styles.opcao}>
							<a>Empresa:</a>
							<InputText
								id="empresa"
								name="Empresa"
								value={empresa.Empresa}
								className={styles.inputText}
								disabled
							/>{" "}
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

					{/* ESPECIFICACOES */}
					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Especificações</div>
							<div className={styles.linha}></div>
						</div>

						<div className={styles.opcao}>
							<a>Porto de Chegada e Partida:</a>
							<InputText
								name="Porto_de_chegada_e_partida"
								value={lpe.Porto_de_chegada_e_partida}
								className={`${styles.inputText} ${
									listaPassageirosError.Porto_de_chegada_e_partida
										? styles.error
										: ""
								}`}
								onChange={handleLpeChange}
							/>
						</div>

						<div className={styles.portoProcedenciaDataEmissao}>
							<div className={styles.opcao}>
								<a>Porto de Procedência:</a>
								<InputText
									name="Porto_de_procedencia"
									value={lpe.Porto_de_procedencia}
									className={`${styles.inputText} ${
										listaPassageirosError.Porto_de_procedencia
											? styles.error
											: ""
									}`}
									onChange={handleLpeChange}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Data de Emissão:</a>
								<InputText
									name="Data_emissao"
									value={lpe.Data_emissao}
									className={`${styles.inputText} ${
										listaPassageirosError.Data_emissao ? styles.error : ""
									}`}
									onChange={handleLpeChange}
								/>
							</div>
						</div>

						<div className={styles.opcao}>
							<a>Observações:</a>
							<InputText
								name="Lpe_obs1"
								value={lpe.Lpe_obs1}
								className={`${styles.inputText} ${
									listaPassageirosError.Lpe_obs1 ? styles.error : ""
								}`}
								onChange={handleLpeChange}
							/>
						</div>
					</div>
					{/* TRIPULANTES */}
					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Tripulantes</div>
							<div className={styles.linha}></div>
						</div>

						<div className={styles.opcao}>
							<a>Comandante:</a>
							<Dropdown
								placeholder="Selecione o Comandante"
								id="comandanteDropDown"
								name="Despacho_comandante"
								optionLabel="Nome"
								optionValue="Nome"
								value={lpe.Comandante}
								options={tripulantes}
								className={`${styles.inputText} ${
									listaPassageirosError.Comandante ? styles.error : ""
								}`}
								onChange={(e) => handleComandanteChange(e, "Comandante")}
							/>
						</div>
						<div className={styles.tripulanteButton}>
							<div className={styles.opcao}>
								<a>Tripulantes:</a>
								<Dropdown
									name="Tripulante"
									value={tripulanteSelecionado?.Documento || ""}
									options={tripulantes.map((tripulante) => ({
										label: `${tripulante.Nome}`,
										value: tripulante.Documento,
									}))}
									className={styles.inputText}
									onChange={handleLpedChange}
								/>
								{error && <div className={styles.errorMessage}>{error}</div>}
							</div>
							<Button
								icon=" pi pi-plus-circle"
								label="Adicionar"
								onClick={handleAddLped}
							/>
						</div>

						{lpedsLocal && (
							<div className={styles.listaTripulantes}>
								{lpedsLocal.length > 0 ? (
									<DataTable
										value={lpedsLocal}
										showGridlines={true}
										tableStyle={{ maxWidth: "49em" }}
										className={`${styles.tabela} ${styles["rounded-datatable"]}`}
									>
										<Column
											headerClassName={styles.firstHeader}
											bodyStyle={{
												border: "none",
												font: "10px",
												padding: "0 0.25em 0 0",
												height: "auto",
											}}
											body={(rowData, { rowIndex }) => (
												<InputText
													value={rowData.pessoal.Documento}
													className={styles.inputTableTripulantes}
													disabled
												/>
											)}
										/>
										<Column
											body={(rowData, options) => (
												<InputText
													value={rowData.pessoal.Nome}
													className={styles.inputTableTripulantes}
													disabled
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
												<InputText
													value={rowData.pessoal.Funcao}
													className={styles.inputTableTripulantes}
													disabled
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
												<InputText
													value={rowData.pessoal.Data_de_nascimento}
													className={styles.inputTableTripulantes}
													disabled
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
												<InputText
													value={rowData.pessoal.Nacionalidade}
													className={styles.inputTableTripulantes}
													disabled
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
											body={renderIconLped}
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
									</DataTable>
								) : (
									""
								)}
							</div>
						)}

						{/* LISTAS */}

						{/* <div className={styles.listaComboios}>
            {lpeComboios.map((comboio, index) => (
              <div key={index} className={styles.comboio}>
                <span>{`Comboio ${index + 1}: ${comboio.Embarcacao}`}</span>
                <button onClick={() => handleRemoveLpeComboio(index)}>Remover</button>
              </div>
            ))}
          </div> */}
					</div>
					<div className={styles.informacoes}>
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Comboio</div>
							<div className={styles.linha}></div>
						</div>

						<div className={styles.tripulanteButton}>
							<div className={styles.opcao}>
								<a>Embarcação:</a>
								<Dropdown
									value={embarcacaoSelecionada?.Inscricao}
									options={embarcacoesComboio}
									optionLabel="Embarcacao"
									optionValue="Inscricao"
									className={styles.inputText}
									onChange={(e) => handleEmbarcacaoChange(e, "embarcacao")}
								/>
								{erroEmbarcacao && (
									<div className={styles.errorMessage}>{erroEmbarcacao}</div>
								)}
							</div>
							{/* <div className={styles.opcao}>
              <a>Embarcação:</a>
              <InputText
                name="Embarcacao"
                value={lpeComboio.Embarcacao}
                className={styles.inputText}
                onChange={handleLpeComboioChange} />
            </div> */}
							<div className={styles.opcao}>
								<Button
									icon=" pi pi-plus-circle"
									label="Adicionar Comboio"
									onClick={handleAddLpeComboio}
								/>
							</div>
						</div>

						{/* LISTA DE COMBOIO */}

						<div className={styles.listaComboios}>
							{lpeComboiosLocal.length > 0 ? (
								<DataTable
									value={lpeComboiosLocal}
									showGridlines={true}
									tableStyle={{ maxWidth: "49em" }}
									className={`${styles.tabela} ${styles["rounded-datatable"]}`}
								>
									<Column
										headerClassName={styles.firstHeader}
										bodyStyle={{
											border: "none",
											maxWidth: "3em",
											font: "10px",
											padding: "0 0.25em 0 0",
											height: "auto",
										}}
										body={(rowData) => (
											<InputText
												value={rowData.embarcacao.Inscricao}
												className={styles.inputTableTripulantes}
												disabled
											/>
										)}
									/>
									<Column
										body={(rowData) => (
											<InputText
												value={rowData.embarcacao.Embarcacao}
												className={styles.inputTableTripulantes}
												disabled
											/>
										)}
										headerClassName={styles.firstHeader}
										bodyStyle={{
											border: "none",
											font: "10px",
											padding: "0 0.25em 0 0.25em",
											height: "auto",
										}}
										headerStyle={{ maxWidth: "7em", height: "0.5em" }}
									/>
									<Column
										body={renderIconComboio}
										bodyStyle={{
											border: "none",
											font: "10px",
											padding: "0 0 0 0.25em",
											height: "auto",
											textAlign: "right",
											alignContent: "right",
										}}
										headerStyle={{
											textAlign: "right",
											alignContent: "right",
											backgroundColor: "white",
											width: "1em",
											color: "black",
											border: "none",
											height: "0.5em",
										}}
									/>
								</DataTable>
							) : (
								""
							)}
						</div>
					</div>

					<div className={styles.botoes}>
						<Button label="Cancelar" onClick={onClose} />
						{/* {loadingSubmit == true ? (
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
								title={embarcacao ? "Salvar" : "Atualizar"}
								onClick={handleSubmit}
								tamanho="10em"
							/>
						)} */}
						<Button
							label={embarcacao ? "Salvar" : "Atualizar"}
							onClick={onClose}
							loading={loading}
						/>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default ModalCadastroEdicao;
