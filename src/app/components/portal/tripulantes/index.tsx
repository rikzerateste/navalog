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
import ModalTripulanteCadastro from "@/components/portal/modalTripulanteCadastro/index";
import InputSearch from "../input/index";
import { Skeleton } from "primereact/skeleton";
import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";
import ConfirmDialog from "../confirmDialog/index"; // Importando o modal de confirmação
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import TripulanteIcon from "/public/images/tripulantes-page.svg";

const Page = () => {
	const [search, setSearch] = useState("");
	const [selectedTripulante, setSelectedTripulante] = useState(null);
	const [pessoal, setPessoal] = useState([
		{
			Controle: null,
			Documento: "",
			Nome: "",
			Funcao: "",
			Data_de_nascimento: "",
			Nacionalidade: null,
			Vencimento_CIR: "",
			RG: "",
		},
	]);
	const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

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
					const response = await axios.get("/api/portal/tripulantes/readCrew", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setPessoal(response.data);
				} catch (error) {
					console.error("Erro ao buscar os dados pessoais:", error);
				} finally {
					setLoading(false); // Marca o carregamento como completo, independentemente do sucesso ou erro
				}
			}
		} else {
			window.location.href = "http://localhost:3000/portal";
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deletePessoal = async (documento: any) => {
		const token = localStorage.getItem("token");

		try {
			const res = await axios.delete("/api/portal/tripulantes/deleteCrew", {
				data: { documento },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPessoal((prevPessoal) =>
				prevPessoal.filter((p) => p.Documento !== documento)
			);
		} catch (error) {
			console.error("Erro ao deletar o registro pessoal:", error);
		}
	};
	const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
	const [tripulanteToDelete, setTripulanteToDelete] = useState<string | null>(
		null
	);
	const handleDeleteConfirm = () => {
		if (tripulanteToDelete) {
			deletePessoal(tripulanteToDelete);
			setTripulanteToDelete(null);
			setIsConfirmDialogVisible(false);
		}
	};

	const handleDeleteCancel = () => {
		setTripulanteToDelete(null);
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
						setTripulanteToDelete(rowData.Documento);
						setIsConfirmDialogVisible(true);
					}}
				></i>
			</div>
		);
	};

	const handleEdit = (tripulantes: any) => {
		setSelectedTripulante(tripulantes);
		setModal(true);
	};

	const [modal, setModal] = useState(false);

	const onClose = () => {
		setModal(false);
		setSelectedTripulante(null);
	};

	const onSuccess = () => {
		fetchData(); // Atualiza os dados da tabela

		onClose();
	};

	const openModal = () => {
		setSelectedTripulante(null);
		setModal(true);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const filteredPessoal = pessoal.filter((p) =>
		p.Nome.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			{modal && (
				<ModalTripulanteCadastro
					onClose={onClose}
					onSuccess={onSuccess}
					tripulante={selectedTripulante}
				/>
			)}
			<div className={styles.container}>
				<div className={styles.title}>
					<Image src={TripulanteIcon} alt=""></Image>
					<p>Tripulantes</p>
				</div>
				<div className={styles.containerPesquisa}>
					<InputSearch
						type="inputIcon"
						icon="pi pi-search"
						placeholder="Pesquise um nome"
						onChange={handleSearchChange}
					/>
					<Button
						tipoBotao="normal"
						title="Novo Registro"
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
						value={filteredPessoal}
						showGridlines
						tableStyle={{ minWidth: "50em" }}
						paginator
						rows={8}
						className={`${styles.tabela} ${styles["rounded-datatable"]}`}
					>
						<Column
							field="Documento"
							header="Documento"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						/>
						<Column
							field="Nome"
							header="Nome"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "20em",
							}}
						/>
						<Column
							field="Funcao"
							header="Função"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						/>
						<Column
							field="Data_de_nascimento"
							header="Data de Nascimento"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						/>
						<Column
							field="Nacionalidade"
							header="Nacionalidade"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						/>
						<Column
							field="Vencimento_CIR"
							header="Vencimento CIR"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						/>
						<Column
							field="RG"
							header="RG"
							headerStyle={{
								color: "black",
								backgroundColor: "white",
								width: "15em",
							}}
						/>
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
						/>
					</DataTable>
				)}
			</div>
			<ConfirmDialog
				visible={isConfirmDialogVisible}
				onHide={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				message="Tem certeza de que deseja excluir este tripulante?"
			/>
			<ToastContainer />
		</>
	);
};

export default Page;
