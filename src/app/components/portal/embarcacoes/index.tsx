"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button/index";
import styles from "./styles.module.scss";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as PrimeButton } from "primereact/button";
import ModalEmbarcacaoCadastro from "@//app/components/portal/modalEmbarcacaoCadastro/index";
import InputSearch from "../input/index";
import { Skeleton } from "primereact/skeleton";
import { ProgressBar } from "primereact/progressbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Ancora from "/public/images/ancora.svg";
import ConfirmDialog from "../confirmDialog/index"; // Importando o modal de confirmação

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

const Page = () => {
	const [embarcacoes, setEmbarcacoes] = useState<Embarcacao[]>([]);
	const [embarcacoesFiltrada, setEmbarcacoesFiltradas] = useState<Embarcacao[]>(
		[]
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true); // Estado de carregamento
	const [novaembarcacoes, setNovaEmbarcacoes] = useState([
		{
			Inscricao: "",
			Embarcacao: "",
			Arqueacao_Bruta: "",
			Registro_Tribunal_Maritimo: "",
			Seguro: "",
			Tonelagem_porte_bruto: "",
			Tonelagem_porte_liquido: "",
			Observacao: "",
			Navegacao: "",
			Id_propulsao: "",
			Atividade: "",
			Comprimento_Total: "",
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
		const token = localStorage.getItem("token");
		if (token) {
			if (isTokenExpired(token)) {
				localStorage.removeItem("token");
				window.location.href = "http://localhost:3000/portal";
			} else {
				try {
					const response = await axios.get(
						"/api/portal/embarcacao/readVessel",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					const embarcacoesLimpas = response.data
						.map((embarcacao: any) => ({
							...embarcacao,
							Embarcacao: embarcacao.Embarcacao.replace(/"/g, ""), // Remove todas as aspas duplas
						}))
						.sort((a: any, b: any) => a.Embarcacao.localeCompare(b.Embarcacao));

					setEmbarcacoes(embarcacoesLimpas);
					setEmbarcacoesFiltradas(embarcacoesLimpas);
				} catch (error) {
					console.error("Erro ao buscar as embarcações:", error);
				} finally {
					setLoading(false); // Definir como falso após a conclusão do carregamento
				}
			}
		} else {
			window.location.href = "http://localhost:3000/portal";
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteEmbarcacao = async (inscricao: any) => {
		const token = localStorage.getItem("token");

		try {
			console.log(inscricao);
			const res = await axios.delete("/api/portal/embarcacao/deleteVessel", {
				data: { inscricao },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setEmbarcacoes((prevEmbarcacoes) =>
				prevEmbarcacoes.filter(
					(embarcacao) => embarcacao.Inscricao !== inscricao
				)
			);
			pesquisaEmbarcacao();
		} catch (error) {
			console.error("Erro ao deletar a embarcação:", error);
		}
	};
	const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
	const [embarcacaoToDelete, setEmbarcacaoToDelete] = useState<string | null>(
		null
	);

	const handleDeleteConfirm = () => {
		if (embarcacaoToDelete) {
			deleteEmbarcacao(embarcacaoToDelete);
			setEmbarcacaoToDelete(null);
			setIsConfirmDialogVisible(false);
		}
	};

	const handleDeleteCancel = () => {
		setEmbarcacaoToDelete(null);
		setIsConfirmDialogVisible(false);
	};

	const renderIcons = (rowData: any) => {
		return (
			<div className={styles.iconCenter}>
				<i
					className={`pi pi-pen-to-square ${styles["icon-bold"]}`}
					onClick={() => handleEdit(rowData)}
				></i>
				<i
					className={`pi pi-trash ${styles["icon-bold"]}`}
					onClick={() => {
						setEmbarcacaoToDelete(rowData.Inscricao);
						setIsConfirmDialogVisible(true);
					}}
				></i>
			</div>
		);
	};

	const [modal, setModal] = useState(false);

	const onClose = () => {
		setModal(false);
		setSelectedEmbarcacoes(null);
	};

	const openModal = () => {
		setSelectedEmbarcacoes(null);
		setModal(true);
	};

	const onSuccess = (text: string) => {
		fetchData(); // Atualiza os dados da tabela

		onClose();
	};
	const [selectedEmbarcacoes, setSelectedEmbarcacoes] = useState(null);

	const handleEdit = (embarcacao: any) => {
		setSelectedEmbarcacoes(embarcacao);
		setModal(true);
	};

	useEffect(() => {
		pesquisaEmbarcacao();
	}, [searchTerm, embarcacoes]);

	const handleSearch = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const pesquisaEmbarcacao = () => {
		if (searchTerm === "") {
			setEmbarcacoesFiltradas(embarcacoes);
		} else {
			setEmbarcacoesFiltradas(
				embarcacoes.filter((embarcacao) =>
					embarcacao.Embarcacao.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}
	};

	return (
		<>
			{modal && (
				<ModalEmbarcacaoCadastro
					onClose={onClose}
					onSuccess={onSuccess}
					embarcacao={selectedEmbarcacoes}
				/>
			)}
			<div className={styles.container}>
				<div className={styles.title}>
					<Image src={Ancora} alt="Logo" />

					<p>Embarcações</p>
				</div>
				<div className={styles.containerPesquisa}>
					<InputSearch
						type="inputIcon"
						icon="pi pi-search"
						placeholder="Pesquise uma Embarcação"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Button
						tipoBotao="normal"
						title="Novo"
						icon="pi pi-plus-circle"
						tamanho="11em"
						onClick={openModal}
					/>
				</div>

				{loading ? (
					<div className={styles.loading}>
						<ProgressBar
							mode="indeterminate"
							style={{ height: "2px" }}
						></ProgressBar>
					</div>
				) : (
					<DataTable
						value={embarcacoesFiltrada}
						showGridlines
						tableStyle={{ minWidth: "10em" }}
						paginator
						rows={10}
						className={`${styles.tabela} ${styles["rounded-datatable"]}`}
						emptyMessage="Nenhuma embarcação disponível" // Mensagem quando não há dados
					>
						<Column
							field="Embarcacao"
							header="Embarcação"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								maxWidth: "27em",
							}}
						></Column>
						<Column
							field="empresa.Empresa"
							header="Empresa"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Inscricao"
							header="Inscrição"
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
				onConfirm={handleDeleteConfirm}
				message="Tem certeza de que deseja excluir esta embarcação?"
			/>
			<ToastContainer position="top-right" />
		</>
	);
};

export default Page;
