import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import styles from "./styles.module.scss";
/* import PrimeButton from "../button/index"; */
import Image from "next/image";
import TripulanteIcon from "/public/images/tripulantes-page.svg";
/* import { ToastContainer, toast } from "react-toastify"; */
//import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputMask } from "primereact/inputmask";
import { useToast } from "@/hooks/useToast";
import { Button } from "primereact/button";

interface Tripulante {
	Controle?: number;
	Documento: string;
	Nome: string;
	Funcao?: string;
	Data_de_nascimento?: string;
	Nacionalidade?: number;
	Vencimento_CIR?: string;
	RG?: string;
}

interface ModalTripulanteCadastroProps {
	onClose: () => void;
	onSuccess: () => void;
	tripulante?: Tripulante | null;
}

interface Funcao {
	Controle: Number;
	Funcao?: String;
	Descricao?: String;
	pessoal: Tripulante[];
}

const ModalTripulanteCadastro: React.FC<ModalTripulanteCadastroProps> = ({
	onClose,
	onSuccess,
	tripulante,
}) => {
	const [novaTripulante, setNovaTripulante] = useState<Tripulante>({
		Controle: undefined,
		Documento: "",
		Nome: "",
		Funcao: "",
		Data_de_nascimento: "",
		Nacionalidade: undefined,
		Vencimento_CIR: "",
		RG: "",
	});

	const [editing, setEditing] = useState(false);
	const [funcao, setFuncao] = useState<Funcao[]>([]);

	const nacionalidade = [
		{ name: "Brasileiro(a)", id: 1 },
		{ name: "Estrangeiro", id: 2 },
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNovaTripulante((prevTripulante) => ({
			...prevTripulante,
			[name]:
				name === "Nacionalidade" || name === "Controle" ? Number(value) : value,
		}));
	};

	useEffect(() => {
		const token = localStorage.getItem("token"); // ou obtenha o token de onde você está armazenando

		const fetchFuncao = async () => {
			try {
				const response = await axios.get("/api/portal/funcao/readFuncao", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setFuncao(response.data);
			} catch (error) {
				console.error("Erro ao buscar empresas:", error);
			}
		};
		if (tripulante) {
			setNovaTripulante(tripulante);
			setEditing(true);
		} else {
			setNovaTripulante({
				Controle: undefined,
				Documento: "",
				Nome: "",
				Funcao: "",
				Data_de_nascimento: "",
				Nacionalidade: undefined,
				Vencimento_CIR: "",
				RG: "",
			});
			setEditing(false);
		}

		fetchFuncao();
	}, []);

	const [tripulanteErros, setTripulanteErros] = useState<{
		[key: string]: boolean;
	}>({});

	const validateTripulanteFields = () => {
		const newErrors: { [key: string]: boolean } = {};

		if (!novaTripulante.Documento) newErrors.Documento = true;
		if (!novaTripulante.Nome) newErrors.Nome = true;
		if (!novaTripulante.Funcao) newErrors.Funcao = true;
		if (!novaTripulante.Data_de_nascimento) newErrors.Data_de_nascimento = true;
		if (!novaTripulante.Vencimento_CIR) newErrors.Vencimento_CIR = true;
		if (!novaTripulante.Nacionalidade) newErrors.Nacionalidade = true;

		setTripulanteErros(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const {showToast} = useToast();

	const handleSubmit = async () => {
		if (!validateTripulanteFields()) {
			return showToast("Error", "Por favor, preencha todos os campos obrigatórios.", "error");
		} else {
			setLoadingSubmit(true);
			const token = localStorage.getItem("token");
			const url = tripulante
				? "/api/portal/tripulantes/updateCrew"
				: "/api/portal/tripulantes/createCrew";
			const method = tripulante ? "put" : "post";

			console.log(novaTripulante);

			try {
				const res = await axios[method](url, novaTripulante, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (method === "put") {
					setLoadingSubmit(false);

					onSuccess();
				} else {
					setLoadingSubmit(false);

					onSuccess();
					// VERIFICAR A DIFERENCA ENTRE O EDIT
				}
			} catch (error) {
				setLoadingSubmit(false);

				showToast("Erro", "Erro ao cadastrar tripulante!", "error");
			}
		}
	};

	const handleDateChange = (e: any) => {
		setNovaTripulante((prevTripulante) => ({
			...prevTripulante,
			Data_de_nascimento: e.value,
		}));
	};
	const handleDateVencimentoChange = (e: any) => {
		setNovaTripulante((prevTripulante) => ({
			...prevTripulante,
			Vencimento_CIR: e.value,
		}));
	};

	const handleRGChange = (e: any) => {
		setNovaTripulante((prevTripulante) => ({
			...prevTripulante,
			Rg: e.value,
		}));
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
				<div className={styles.form}>
					<div className={styles.title}>
						<Image src={TripulanteIcon} alt="Logo" />
						{tripulante ? <a>Editar Tripulante</a> : <a>Novo Tripulante</a>}
					</div>
					<div className={styles.informacoes}>
						{/* TITULO INFORMACOES */}
						<div className={styles.containerLinha}>
							<div className={styles.linha}></div>
							<div className={styles.texto}>Informações</div>
							<div className={styles.linha}></div>
						</div>
						{/* NOME E FUNCAO */}

						<div className={styles.nomeFuncao}>
							<div className={styles.opcao}>
								<a>Nome:</a>
								<InputText
									id="nome"
									name="Nome"
									value={novaTripulante.Nome}
									className={`${styles.inputText} ${
										tripulanteErros.Nome ? styles.error : ""
									}`}
									onChange={handleChange}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Função:</a>
								<Dropdown
									id="funcao"
									name="Funcao"
									optionLabel="Funcao"
									optionValue="Funcao"
									value={novaTripulante.Funcao}
									options={funcao}
									className={`${styles.inputText} ${
										tripulanteErros.Funcao ? styles.error : ""
									}`}
									onChange={(e: any) =>
										setNovaTripulante((prevTripulante) => ({
											...prevTripulante,
											Funcao: e.value,
										}))
									}
								/>
							</div>
						</div>

						{/* DOCUMENTO E VENCIMENTO DA CIR */}

						<div className={styles.docVenci}>
							<div className={styles.opcao}>
								<a>Documento:</a>
								<InputText
									id="documento"
									name="Documento"
									value={novaTripulante.Documento}
									className={`${styles.inputText} ${
										tripulanteErros.Documento ? styles.error : ""
									}`}
									onChange={handleChange}
									disabled={editing} // Campo desabilitado quando estiver editando
								/>
							</div>
							<div className={styles.opcao}>
								<a>Vencimento da CIR:</a>
								<InputMask
									value={novaTripulante.Vencimento_CIR}
									onChange={handleDateVencimentoChange}
									mask="99/99/9999"
									className={`${styles.inputText} ${
										tripulanteErros.Vencimento_CIR ? styles.error : ""
									}`}
									slotChar="dd/mm/yyyy"
								/>
							</div>
						</div>

						{/* DATA DE NASCIMENTO E NACIONALIDADE */}

						<div className={styles.dtNascNacio}>
							<div className={styles.opcao}>
								<a>Data de Nascimento:</a>
								<InputMask
									value={novaTripulante.Data_de_nascimento}
									onChange={handleDateChange}
									mask="99/99/9999"
									className={`${styles.inputText} ${
										tripulanteErros.Data_de_nascimento ? styles.error : ""
									}`}
									slotChar="dd/mm/yyyy"
								/>
							</div>
							<div className={styles.opcao}>
								<a>RG:</a>
								<InputMask
									id="rg"
									value={novaTripulante.RG}
									mask="99.999.999-99"
									className={`${styles.inputText} ${
										tripulanteErros.RG ? styles.error : ""
									}`}
								/>
							</div>
							<div className={styles.opcao}>
								<a>Nacionalidade:</a>
								<Dropdown
									id="nacionalidade"
									name="Nacionalidade"
									optionLabel="name"
									optionValue="id"
									value={novaTripulante.Nacionalidade}
									options={nacionalidade}
									className={`${styles.inputText} ${
										tripulanteErros.Nacionalidade ? styles.error : ""
									}`}
									onChange={(e: any) =>
										setNovaTripulante((prevTripulante) => ({
											...prevTripulante,
											Nacionalidade: e.value,
										}))
									}
								/>
							</div>
						</div>
					</div>
					<div className={styles.botoes}>
						<Button
							
							label="Cancelar"
							onClick={onClose}
							
						/>
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
								disabled
								tamanho="10em"
							/>
						) : (
							<PrimeButton
								tipoBotao="normal"
								title={editing ? "Atualizar" : "Salvar"}
								onClick={handleSubmit}
								tamanho="10em"
							/>
						)} */}
						<Button
							
							label={editing ? "Atualizar" : "Salvar"}
							onClick={onClose}
							loading={loadingSubmit}	
						/>
					</div>
				</div>
			</Dialog>
			{/* <ToastContainer /> */}
		</>
	);
};

export default ModalTripulanteCadastro;
