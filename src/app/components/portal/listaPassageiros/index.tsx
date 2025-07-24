"use client";
//import useSWR from "swr";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import Button from "../button/index";
import { Button } from "primereact/button";
import styles from "./styles.module.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as PrimeButton } from "primereact/button";
import ModalCadastroEdicao from "@/components/portal/modalListaPassageirosCadastro/index";
import InputSearch from "../input/index";
import Image from "next/image";
import { ProgressBar } from "primereact/progressbar";

import ListaPassageirosIcon from "/public/images/ListaDePassageiros-Icon.svg";
//import { ToastContainer } from "react-toastify";

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
}

interface LPED {
	Controle?: number;
	Lista?: number;
	Documento?: string;
	Identificacao?: string;
	Nome?: string;
	pessoal: Pessoal;
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

const Page = () => {
	const [passageiros, setPassageiros] = useState<LPE[]>([]);
	const [passageirosFiltrados, setPassageirosFiltrados] = useState<LPE[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [modal, setModal] = useState(false);
	const [selectedPassageiro, setSelectedPassageiro] = useState<LPE | null>(
		null
	);
	const [loading, setLoading] = useState(false); // Estado para controlar o loading
	const [listaPassageiros, setListaPassageiros] = useState<LPE>();
	//Variavel do relatório
	const [reportState, setReportState] = useState<{
		loading: boolean;
		error?: { message: string };
	}>({ loading: false, error: undefined });

	const isTokenExpired = (token: any) => {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const expiry = payload.exp * 1000; // Conversão para milissegundos
			return Date.now() > expiry;
		} catch (e) {
			return true;
		}
	};

	const fetchData = async () => {
		setLoading(true); // Ativa o loading ao iniciar a busca
		const token = localStorage.getItem("token");
		if (token) {
			if (isTokenExpired(token)) {
				localStorage.removeItem("token");
				window.location.href = "http://localhost:3000/portal";
			} else {
				try {
					const response = await axios.get(
						"/api/portal/listaPassageiros/readPassengerList",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setPassageiros(response.data);
					setPassageirosFiltrados(response.data);
				} catch (error) {
					console.error("Erro ao buscar os passageiros:", error);
				} finally {
					setLoading(false); // Desativa o loading ao finalizar a busca
				}
			}
		} else {
			window.location.href = "http://localhost:3000/portal";
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deletePassageiro = async (controle: number) => {
		const token = localStorage.getItem("token");

		try {
			await axios.delete("/api/portal/listaPassageiros/deletePassengerList", {
				data: { Controle: controle },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPassageiros((prevPassageiros) =>
				prevPassageiros.filter((passageiro) => passageiro.Controle !== controle)
			);
			pesquisaPassageiro();
		} catch (error) {
			console.error("Erro ao deletar o passageiro:", error);
		}
	};

	const handleInfos = async (controle: number) => {
		const token = localStorage.getItem("token");
		setLoading(true);

		try {
			const listaPassageirosResponse = await axios.get(
				`/api/portal/listaPassageiros/getLpeForPDF?controle=${controle}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setListaPassageiros(listaPassageirosResponse.data);
			//console.log(listaPassageirosResponse.data);
			await btnReportGenerate(listaPassageirosResponse.data);
		} catch (error) {
			console.error("Erro ao buscar as informações da lista de passageiros");
		} finally {
			setLoading(false);
		}
	};

	//Função de renderizar o relatório
	async function btnReportGenerate(reportData: any) {
		// Aqui estamos carregando a biblioteca jsreport dinamicamente porque só funciona no client side
		// @ts-ignore
		const jsreport: any = (await import("@jsreport/browser-client")).default;

		const jsonData = JSON.stringify(reportData);

		// API do jsreport com minha authenticate
		jsreport.serverUrl = "https://beecode.jsreportonline.net/";
		jsreport.headers["Authorization"] =
			"Basic " + btoa("davisantana.ti@gmail.com:bc2024");

		console.log(jsonData);

		try {
			setReportState((prev) => ({ ...prev, loading: true, error: undefined }));

			// Variavel do relatório onde passamos o template a ser utilizado o data (dados enviados para o relatorio)
			const report = await jsreport.render({
				template: { name: "avisodesaida-template" },
				data: jsonData,
				options: { office: { preview: true } },
			});

			report.openInWindow({ title: "Aviso de Saida - Navegacao Interior" });
		} catch (error) {
			const errMsg =
				error instanceof Error ? error.message : "Report unknown error";
			setReportState((prev) => ({ ...prev, error: { message: errMsg } }));
		} finally {
			setReportState((prev) => ({ ...prev, loading: false }));
		}
	}

	const renderIcons = (rowData: any) => {
		return (
			<div className={styles.iconCenter}>
				<i
					className={`pi pi-file-export ${styles["icon-bold"]}`}
					onClick={() => handleInfos(rowData.Controle)}
				></i>
				<i
					className={`pi pi-pen-to-square ${styles["icon-bold"]}`}
					onClick={() => handleEdit(rowData)}
				></i>
				<i
					className={`pi pi-trash ${styles["icon-bold"]}`}
					onClick={() => deletePassageiro(rowData.Controle)}
				></i>
			</div>
		);
	};

	const onClose = () => {
		setModal(false);
		setSelectedPassageiro(null);
	};

	const onSuccess = () => {
		fetchData();
		onClose();
	};
	const openModal = () => {
		setSelectedPassageiro(null);
		setModal(true);
	};

	const handleEdit = (passageiro: LPE) => {
		console.log(passageiro);
		setSelectedPassageiro(passageiro);
		setModal(true);
	};

	useEffect(() => {
		pesquisaPassageiro();
	}, [searchTerm, passageiros]);

	const handleSearch = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const pesquisaPassageiro = () => {
		if (searchTerm === "") {
			setPassageirosFiltrados(passageiros);
		} else {
			setPassageirosFiltrados(
				passageiros.filter((passageiro) =>
					passageiro.embarcacao?.Embarcacao?.toLowerCase().includes(
						searchTerm.toLowerCase()
					)
				)
			);
		}
	};

	return (
		<>
			{modal && (
				<ModalCadastroEdicao
					onClose={onClose}
					onSuccess={onSuccess}
					passageiro={selectedPassageiro}
				/>
			)}
			<div className={styles.container}>
				<div className={styles.title}>
					<Image src={ListaPassageirosIcon} alt={""}></Image>
					<p>Lista de Passageiros</p>
				</div>
				<div className={styles.containerPesquisa}>
					<InputSearch
						type="inputIcon"
						icon="pi pi-search"
						placeholder="Pesquise um Passageiro"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Button
						
						label="Nova Lista"
						icon=" pi pi-plus-circle"
					
						onClick={openModal}
					/>
				</div>
				{loading ? ( // Exibe o loading enquanto os dados estão sendo carregados
					<div className={styles.loading}>
						<ProgressBar
							mode="indeterminate"
							style={{ height: "2px" }}
						></ProgressBar>
					</div>
				) : (
					<DataTable
						value={passageirosFiltrados}
						showGridlines
						tableStyle={{ minWidth: "10em" }}
						paginator
						rows={10}
						className={`${styles.tabela} ${styles["rounded-datatable"]}`}
					>
						<Column
							field="Controle"
							header="Controle"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="embarcacao.Embarcacao"
							header="Embarcação"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								maxWidth: "27em",
							}}
						></Column>
						<Column
							field="Data_emissao"
							header="Data de Emissão"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							header="Ações"
							body={renderIcons}
							headerStyle={{
								textAlign: "center",
								alignContent: "center",
								backgroundColor: "white",
								width: "4em",
								color: "black",
							}}
							bodyStyle={{ justifyContent: "space-between" }}
						></Column>
					</DataTable>
				)}
			</div>
			{/* <ToastContainer /> */}
		</>
	);
};

export default Page;
