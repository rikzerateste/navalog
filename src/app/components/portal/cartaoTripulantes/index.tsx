"use client";
//import useSWR from "swr";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import styles from "./styles.module.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
//import { Button as PrimeButton } from "primereact/button";
import ModalCTSCadastro from "../modalCartaoTripulantesCadastro/index";
import InputSearch from "../input/index";
import { ProgressBar } from "primereact/progressbar";
import CtsIcon from "/public/images/ctsIcon.svg";
import Image from "next/image";

interface Tripulante {
	Categoria: string;
	Nivel: string;
	Quantidade: number;
	id: number;
	CTS_id: number;
	Tipo_de_Tripulante?: string;
}

interface CTS {
	Controle: number;
	CTS_controle?: number;
	Embarcacao: string;
	Data_emissao?: string;
	Tripulantes: Tripulante[];
	embarcacao: Embarcacao;
}

interface Embarcacao {
	Inscricao: string;
	Embarcacao: string;
}

const Page = () => {
	const [search, setSearch] = useState("");
	const [selectedCTS, setSelectedCTS] = useState(null);
	const [loading, setLoading] = useState(false); // Estado para controlar o loading

	//Variavel do relatório
	const [reportState, setReportState] = useState<{
		loading: boolean;
		error?: { message: string };
	}>({ loading: false, error: undefined });

	const [cts, setCTS] = useState<CTS[]>([
		{
			Controle: 0,
			Embarcacao: "",
			Data_emissao: "",
			Tripulantes: [],
			embarcacao: {
				Inscricao: "",
				Embarcacao: "",
			},
		},
	]);

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
		setLoading(true);
		const token = localStorage.getItem("token");
		if (token) {
			if (isTokenExpired(token)) {
				localStorage.removeItem("token");
				window.location.href = "http://localhost:3000/portal";
			} else {
				try {
					const response = await axios.get("/api/portal/cts/readCrewCard", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setCTS(response.data);
					console.log(response.data);
				} catch (error) {
					console.error("Erro ao buscar os dados do CTS:", error);
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

	const deleteCTS = async (CTS_controle: any) => {
		const token = localStorage.getItem("token");

		try {
			const res = await axios.delete("/api/portal/cts/deleteCrewCard", {
				data: { CTS_controle },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setCTS((prevCTS) =>
				prevCTS.filter((c) => c.CTS_controle !== CTS_controle)
			);
		} catch (error) {
			console.error("Erro ao deletar o registro do CTS:", error);
		}
	};

	const handleInfos = async (controle: number) => {
		const token = localStorage.getItem("token");
		setLoading(true);

		console.log(controle);

		try {
			//Trocar aqui a o endpoint para a api a ser criada do cts
			const ctsResponse = await axios.get(
				`/api/portal/cts/getCtsForPdf?controle=${controle}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(ctsResponse.data);

			await btnReportGenerate(ctsResponse.data);
		} catch (error) {
			console.error(
				"Erro ao buscar as informações do pedido de despacho",
				error
			);
		} finally {
			setLoading(false);
		}
	};

	//Função de renderizar o relatório
	async function btnReportGenerate(reportData: any) {
		// Aqui estamos carregando a biblioteca jsreport dinamicamente porque só funciona no client side
		//@ts-ignore
		const jsreport: any = (await import("@jsreport/browser-client")).default;

		const jsonData = JSON.stringify(reportData);

		// API do jsreport com minha authenticate
		jsreport.serverUrl = "https://beecode.jsreportonline.net/";

		//!! Descomentar authenticacao abaixo depois
		jsreport.headers["Authorization"] =
			"Basic " + btoa("davisantana.ti@gmail.com:bc2024");

		console.log(jsonData);

		try {
			setReportState((prev) => ({ ...prev, loading: true, error: undefined }));

			// Variavel do relatório onde passamos o template a ser utilizado o data (dados enviados para o relatorio)
			const report = await jsreport.render({
				//!! Adiciontar template correto depois
				template: { name: "cts-template" },
				data: jsonData,
				options: { office: { preview: true } },
			});

			report.openInWindow({ title: "Cartao de Tripulacao de Seguranca" });
		} catch (error) {
			const errMsg =
				error instanceof Error ? error.message : "Report unknown error";
			setReportState((prev) => ({ ...prev, error: { message: errMsg } }));
		} finally {
			setReportState((prev) => ({ ...prev, loading: false }));
		}
	}

	function handleAlert() {
		// Função para alert
	}

	const renderIcons = (rowData: any) => {
		return (
			<div className={styles.iconCenter}>
				<i
					className={`pi pi-file-export ${styles["icon-bold"]}`}
					onClick={() => handleInfos(rowData.CTS_controle)}
				></i>
				<i
					className={`pi pi-pen-to-square ${styles["icon-bold"]}`}
					onClick={() => handleEdit(rowData)}
				></i>
				<i
					className={`pi pi-trash ${styles["icon-bold"]}`}
					onClick={() => deleteCTS(rowData.CTS_controle)}
				></i>
			</div>
		);
	};

	const handleEdit = (cts: any) => {
		setSelectedCTS(cts);
		console.log(selectedCTS);
		setModal(true);
	};

	const [modal, setModal] = useState(false);

	const onClose = () => {
		setModal(false);
		setSelectedCTS(null);
	};

	const onSuccess = () => {
		fetchData(); // Atualiza os dados da tabela
		setModal(false);
		setSelectedCTS(null);
	};
	const openModal = () => {
		setSelectedCTS(null);
		setModal(true);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	return (
		<>
			{modal && (
				<ModalCTSCadastro
					onClose={onClose}
					onSuccess={onSuccess}
					cts={selectedCTS}
				/>
			)}
			<div className={styles.container}>
				<div className={styles.title}>
					<Image src={CtsIcon} alt="Logo" />
					<p>Cartão de Tripulação de Segurança</p>
				</div>
				<div className={styles.containerPesquisa}>
					<InputSearch
						type="inputIcon"
						icon="pi pi-search"
						placeholder="Pesquise uma embarcação"
						onChange={handleSearchChange}
					/>
					<Button
						label="Novo Registro"
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
						value={cts}
						showGridlines
						tableStyle={{ minWidth: "50em" }}
						paginator
						rows={8}
						className={`${styles.tabela} ${styles["rounded-datatable"]}`}
					>
						<Column
							field="embarcacao.Embarcacao"
							header="Embarcação"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "20em",
							}}
						></Column>
						<Column
							field="Data_emissao"
							header="Data de Emissão"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						></Column>
						<Column
							header="Ações"
							body={renderIcons}
							headerStyle={{
								textAlign: "center",
								justifyContent: "center",
								backgroundColor: "white",
								width: "10em",
								color: "black",
							}}
							bodyStyle={{ textAlign: "center", width: "10em" }}
						></Column>
					</DataTable>
				)}
			</div>
		</>
	);
};

export default Page;
