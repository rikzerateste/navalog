"use client";
import useSWR from "swr";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button/index";
import styles from "./styles.module.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { Button as PrimeButton } from "primereact/button";
import InputSearch from "../input/index";
import ModalDespachoCadastro from "../modalPedidoDespacho/index";
import Link from "next/link";
import DocIcon from "/public/images/pedido-de-dispacho-icon.svg";
import { ProgressBar } from "primereact/progressbar";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";
import ConfirmDialog from "../confirmDialog";

interface PedidoDespacho {
	Id: number;
	Despacho_embarcacao: string;
	Data_do_despacho: string;
	Despacho: string;
	Despacho_como_esperado: string;
	Revalidacao: string;
	VHF_COM_DSC: string;
	VHF_SEM_DSC: string;
	Transponder_9GHz: string;
	Frequencia: string;
	Despacho_comandante: string;
	Despacho_obs: string;
	Porto_de_Estadia: string;
	Certificado_ou_documento_temporario1: string;
	Certificado_ou_documento_temporario2: string;
	Informacao_sobre_vencimento_do_certificado_ou_documento: string;
	pessoal: Pessoal;
	embarcacao: Embarcacao;
}

interface Pessoal {
	Documento: string;
	Nome: string;
	Funcao?: string;
	Data_de_nascimento?: string;
	Nacionalidade?: number;
}

interface Embarcacao {
	Empresa?: number;
	Inscricao: string;
	Embarcacao: string;
}

const Page = () => {
	const [despachos, setDespachos] = useState<PedidoDespacho[]>([]);
	const [despachoFiltrado, setDespachoFiltrado] = useState<PedidoDespacho[]>(
		[]
	);
	const [pedidoDeDespacho, setPedidoDeDespacho] = useState<PedidoDespacho>({
		Id: 0,
		Despacho_embarcacao: "",
		Data_do_despacho: "",
		Despacho: "",
		Despacho_como_esperado: "",
		Revalidacao: "",
		VHF_COM_DSC: "",
		VHF_SEM_DSC: "",
		Transponder_9GHz: "",
		Frequencia: "",
		Despacho_comandante: "",
		Despacho_obs: "",
		Porto_de_Estadia: "",
		Certificado_ou_documento_temporario1: "",
		Certificado_ou_documento_temporario2: "",
		Informacao_sobre_vencimento_do_certificado_ou_documento: "",
		pessoal: {
			Documento: "",
			Nome: "",
		},
		embarcacao: {
			Inscricao: "",
			Embarcacao: "",
		},
	});

	const [searchTerm, setSearchTerm] = useState("");

	const [loading, setLoading] = useState(false); // Estado para controlar o loading

	const [isModalOpen, setIsModalOpen] = useState(false);

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
		setLoading(true);
		const token = localStorage.getItem("token"); // ou obtenha o token de onde você está armazenando
		if (token) {
			if (isTokenExpired(token)) {
				localStorage.removeItem("token");
				window.location.href = "http://localhost:3000/portal";
			} else {
				try {
					const response = await axios.get(
						"/api/portal/pedidoDespacho/readDispatchRequest",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setDespachos(response.data);
					setDespachoFiltrado(response.data); // Inicializa filteredDespachos com todos os dados
				} catch (error) {
					console.error("Erro ao buscar os despachos:", error);
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

	const deleteDespacho = async (pedido: number) => {
		const token = localStorage.getItem("token");

		try {
			const res = await axios.delete(
				"/api/portal/pedidoDespacho/deleteDispatchRequest",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					data: { pedido },
				}
			);

			// Verifique se a resposta é positiva (200 OK ou similar)
			if (res.status === 200) {
				// Remove o despacho da lista local
				setDespachos((prevDespachos) =>
					prevDespachos.filter((despacho) => despacho.Id !== pedido)
				);
				pesquisaDespacho(); // Reaplica o filtro após a exclusão
			} else {
				console.error("Erro ao excluir despacho:", res.status);
			}
		} catch (error) {
			console.error("Erro ao deletar o despacho:", error);
		}
	};

	const handleInfos = async (pedido: number) => {
		const token = localStorage.getItem("token");
		setLoading(true);

		try {
			const pedidoResponse = await axios.get(
				`/api/portal/pedidoDespacho/getDispatchRequestForPdf?pedido=${pedido}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setPedidoDeDespacho(pedidoResponse.data);
			console.log(pedidoResponse.data);
			await btnReportGenerate(pedidoResponse.data);
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
				template: { name: "pedidodedespacho-template" },
				data: jsonData,
				options: { office: { preview: true } },
			});

			report.openInWindow({
				title: "Pedido de Despacho por Periodo - Navegacao Interior",
			});
		} catch (error) {
			const errMsg =
				error instanceof Error ? error.message : "Report unknown error";
			setReportState((prev) => ({ ...prev, error: { message: errMsg } }));
		} finally {
			setReportState((prev) => ({ ...prev, loading: false }));
		}
	}

	const actionBodyTemplate = (rowData: any) => {
		return (
			<PrimeButton
				label="Delete"
				icon="pi pi-times"
				className="p-button-danger"
				onClick={() => deleteDespacho(rowData.Pedido_de_despacho)}
			/>
		);
	};
	const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
	const [despachoToDelete, setDespachoToDelete] = useState<number | null>(null);
	const handleDeleteConfirm = () => {
		console.log(despachoToDelete);
		if (despachoToDelete !== null) {
			deleteDespacho(despachoToDelete); // Exclui o despacho
			setDespachoToDelete(null);
			setIsConfirmDialogVisible(false);
		}
	};

	const handleDeleteCancel = () => {
		setDespachoToDelete(null);
		setIsConfirmDialogVisible(false);
	};

	const renderIcons = (rowData: any) => {
		return (
			<div className={styles.iconCenter}>
				<i
					className={`pi pi-file-export ${styles["icon-bold"]}`}
					onClick={() => handleInfos(rowData.Id)}
				></i>
				<i
					className={`pi pi-pen-to-square ${styles["icon-bold"]}`}
					onClick={() => handleEdit(rowData)}
				></i>
				<i
					className={`pi pi-trash ${styles["icon-bold"]}`}
					onClick={() => {
						setDespachoToDelete(rowData.Id);
						setIsConfirmDialogVisible(true);
					}}
				></i>
			</div>
		);
	};

	const [selectedDespacho, setSelectedDespacho] =
		useState<PedidoDespacho | null>(null);

	const handleEdit = (despacho: PedidoDespacho) => {
		setSelectedDespacho(despacho);
		setIsModalOpen(true);
	};

	const onClose = () => {
		setIsModalOpen(false);
		setSelectedDespacho(null);
	};

	const onSuccess = () => {
		fetchData(); // Atualiza os dados da tabela

		onClose();
	};

	const openModal = () => {
		setSelectedDespacho(null);
		setIsModalOpen(true);
	};

	// PESQUISA
	useEffect(() => {
		pesquisaDespacho();
	}, [searchTerm, despachos]);

	const handleSearch = (event: any) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	};

	const pesquisaDespacho = () => {
		if (searchTerm === "") {
			setDespachoFiltrado(despachos);
		} else {
			setDespachoFiltrado(
				despachos.filter((despacho) =>
					despacho.embarcacao?.Embarcacao?.toLowerCase().includes(
						searchTerm.toLowerCase()
					)
				)
			);
		}
	};

	return (
		<>
			{isModalOpen && (
				<ModalDespachoCadastro
					onClose={onClose}
					onSuccess={onSuccess}
					despacho={selectedDespacho}
				/>
			)}
			<div className={styles.container}>
				<div className={styles.title}>
					<Image src={DocIcon} alt="Logo" />
					<p>Pedidos de Despacho</p>
				</div>
				<div className={styles.containerPesquisa}>
					<InputSearch
						type="inputIcon"
						icon="pi pi-search"
						placeholder="Pesquise um despacho"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Button
						tipoBotao="normal"
						title="Novo Despacho"
						icon=" pi pi-plus-circle"
						tamanho="11em"
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
						value={despachoFiltrado}
						showGridlines
						tableStyle={{ minWidth: "10em" }}
						paginator
						rows={10}
						className={`${styles.tabela} ${styles["rounded-datatable"]}`}
					>
						<Column
							field="Id"
							header="Id"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								maxWidth: "27em",
							}}
						></Column>
						<Column
							field="Despacho_comandante"
							header="Comandante"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								maxWidth: "27em",
							}}
						></Column>
						<Column
							field="embarcacao.Embarcacao"
							header="Embarcação"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Data_do_despacho"
							header="Data do Despacho"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Porto_de_Estadia"
							header="Porto de Estadia"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Frequencia"
							header="Frequência"
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
			<ConfirmDialog
				visible={isConfirmDialogVisible}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm} // Certifique-se de que isso está correto
				message="Tem certeza de que deseja excluir?"
			/>
			<ToastContainer />
		</>
	);
};

export default Page;
