"use client";
import useSWR from "swr";
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
import ModalEmpresaCadastro from "@//app/components/portal/modalEmpresaCadastro/index";
import InputSearch from "../input/index";
import { ProgressBar } from "primereact/progressbar";
import { Skeleton } from "primereact/skeleton";
import ConfirmDialog from "../confirmDialog/index"; // Importando o modal de confirmação
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Suitcase from "/public/images/suitcase.svg";

interface Empresa {
	Codigo: string;
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

const Page = () => {
	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	const [empresaFiltrada, setEmpresaFiltrada] = useState<Empresa[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true); // Estado de carregamento
	const [novaEmpresa, setNovaEmpresa] = useState({
		Codigo: "",
		Empresa: "",
		Endereco: "",
		Num: "",
		Cidade: "",
		Bairro: "",
		Cep: "",
		UF: "",
		CNPJ: "",
		Inscricao_Estadual: "",
		Contato: "",
		Fone_1: "",
		Fone_2: "",
		Celular: "",
		Email: "",
		Empresa_certificado: "",
		Empresa_vencecert: "",
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

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
		const token = localStorage.getItem("token"); // ou obtenha o token de onde você está armazenando
		if (token) {
			if (isTokenExpired(token)) {
				localStorage.removeItem("token");
				window.location.href = "http://localhost:3000/portal";
			} else {
				try {
					const response = await axios.get("/api/portal/empresa/readCompany", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					// Remover aspas duplas e ordenar por nome da empresa
					const empresasLimpas = response.data
						.map((empresa: any) => ({
							...empresa,
							Empresa: empresa.Empresa.replace(/"/g, ""), // Remove todas as aspas duplas
						}))
						.sort((a: any, b: any) => a.Empresa.localeCompare(b.Empresa));

					setEmpresas(empresasLimpas);
					setEmpresaFiltrada(empresasLimpas);

					setEmpresas(empresasLimpas);
					setEmpresaFiltrada(empresasLimpas); // Inicializa filteredEmpresas com todos os dados
				} catch (error) {
					console.error("Erro ao buscar as empresas:", error);
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

	const deleteEmpresa = async (codigo: any) => {
		const token = localStorage.getItem("token");

		console.log(codigo);
		if (!token || isTokenExpired(token)) {
			// Redirecionar para a página de login ou mostrar mensagem de erro
			window.location.href = "/portal";
			return;
		}

		try {
			const res = await axios.delete("/api/portal/empresa/deleteCompany", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					codigo, // Aqui, o código é enviado como um parâmetro de query
				},
			});
			// Remove a empresa da lista local
			setEmpresas((prevEmpresas) =>
				prevEmpresas.filter((empresa) => empresa.Codigo !== codigo)
			);
			pesquisaEmpresa(); // Reaplica o filtro após a exclusão
		} catch (error: any) {
			console.error("Erro ao deletar a empresa:", error.message);
		}
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setNovaEmpresa((prevEmpresa) => ({
			...prevEmpresa,
			[name]: value,
		}));
	};

	const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
	const [empresaToDelete, setEmpresaToDelete] = useState<string | null>(null);

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
						setEmpresaToDelete(rowData.Codigo);
						setIsConfirmDialogVisible(true);
					}}
				></i>
			</div>
		);
	};

	const handleEdit = (empresa: any) => {
		setSelectedEmpresa(empresa);
		setModal(true);
	};

	const [selectedEmpresa, setSelectedEmpresa] = useState(null);
	const [modal, setModal] = useState(false);

	const onClose = () => {
		setModal(false);
		setSelectedEmpresa(null);
	};

	const onSuccess = () => {
		fetchData(); // Atualiza os dados da tabela
		onClose;
	};
	const openModal = () => {
		setSelectedEmpresa(null);
		setModal(true);
	};

	const handleDeleteConfirm = () => {
		if (empresaToDelete) {
			deleteEmpresa(empresaToDelete);
			setEmpresaToDelete(null);
			setIsConfirmDialogVisible(false);
		}
	};

	const handleDeleteCancel = () => {
		setEmpresaToDelete(null);
		setIsConfirmDialogVisible(false);
	};

	useEffect(() => {
		pesquisaEmpresa();
	}, [searchTerm, empresas]);

	const handleSearch = (event: any) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	};

	const pesquisaEmpresa = () => {
		if (searchTerm === "") {
			setEmpresaFiltrada(empresas);
		} else {
			setEmpresaFiltrada(
				empresas.filter((empresa) =>
					empresa.Empresa.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}
	};

	return (
		<>
			{modal && (
				<ModalEmpresaCadastro
					onClose={onClose}
					onSuccess={onSuccess}
					empresa={selectedEmpresa}
				/>
			)}
			<div className={styles.container}>
				<div className={styles.title}>
					<Image src={Suitcase} alt=""></Image>
					<p>Empresas</p>
				</div>
				<div className={styles.containerPesquisa}>
					<InputSearch
						type="inputIcon"
						icon="pi pi-search"
						placeholder="Pesquise uma empresa"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Button
						tipoBotao="normal"
						title="Nova Empresa"
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
						value={empresaFiltrada}
						showGridlines
						tableStyle={{ minWidth: "10em" }}
						paginator
						rows={10}
						className={`${styles.tabela} ${styles["rounded-datatable"]}`}
						emptyMessage="Nenhuma empresa disponível" // Mensagem quando não há dados
					>
						<Column
							field="Empresa"
							header="Empresa"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								maxWidth: "27em",
							}}
						></Column>
						<Column
							field="Cidade"
							header="Cidade"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Contato"
							header="Contato"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Fone_1"
							header="Fone"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "auto",
							}}
						></Column>
						<Column
							field="Celular"
							header="Celular"
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
				message="Tem certeza de que deseja excluir esta empresa?"
			/>
			<ToastContainer />
		</>
	);
};

export default Page;
