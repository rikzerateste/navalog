"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ModalEmpresaCadastro from "@/components/portal/modalEmpresaCadastro/index";
import Suitcase from "/public/images/suitcase.svg";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { ProgressBar } from "primereact/progressbar";

import styles from "./empresas.module.scss";
import { Empresa, getEmpresas } from "@/services/empresas";

export default function Empresas() {
	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	const [filteredEmpresas, setFilteredEmpresas] = useState<Empresa[]>([]);

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

	const fetchData = useCallback(async () => {
		setLoading(true);

		const empresas = await getEmpresas();

		// const empresasLimpas = response
		// 	.map((empresa) => ({
		// 		...empresa,
		// 		Empresa: empresa.Empresa.replace(/"/g, ""),
		// 	}))
		// 	.sort((a: any, b: any) => a.Empresa.localeCompare(b.Empresa));

		setEmpresas(empresas);
		setFilteredEmpresas(empresas);

		setLoading(false);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const deleteEmpresa = async (codigo: any) => {
		// try {
		// 	const res = await axios.delete("/api/portal/empresa/deleteCompany", {
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 		params: {
		// 			codigo, // Aqui, o código é enviado como um parâmetro de query
		// 		},
		// 	});
		// 	// Remove a empresa da lista local
		// 	setEmpresas((prevEmpresas) =>
		// 		prevEmpresas.filter((empresa) => empresa.Codigo !== codigo)
		// 	);
		// 	pesquisaEmpresa(); // Reaplica o filtro após a exclusão
		// } catch (error: any) {
		// 	console.error("Erro ao deletar a empresa:", error.message);
		// }
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
		setOpenModal(true);
	};

	const [selectedEmpresa, setSelectedEmpresa] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const onClose = () => {
		setOpenModal(false);
		setSelectedEmpresa(null);
	};

	const onSuccess = () => {
		fetchData();
		onClose;
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

	// useEffect(() => {
	// 	pesquisaEmpresa();
	// }, [searchTerm, empresas]);

	const handleSearch = (event: any) => {
		setSearchTerm(event.target.value);
		console.log(searchTerm);
	};

	const pesquisaEmpresa = () => {
		// if (searchTerm === "") {
		// 	setEmpresaFiltrada(empresas);
		// } else {
		// 	setEmpresaFiltrada(
		// 		empresas.filter((empresa) =>
		// 			empresa.Empresa.toLowerCase().includes(searchTerm.toLowerCase())
		// 		)
		// 	);
		// }
	};

	return (
		<div className={styles.container}>
			{openModal && (
				<ModalEmpresaCadastro
					onClose={onClose}
					onSuccess={onSuccess}
					empresa={selectedEmpresa}
					isOpen={openModal}
				/>
			)}

			<div className={styles.container}>
				<header>
					<div className={styles.title}>
						<Image src={Suitcase} alt="empresas" />
						<p>Empresas</p>
					</div>

					<div className={styles.toolbar}>
						<IconField iconPosition="left">
							<InputIcon className="pi pi-search" />

							<InputText
								placeholder="Pesquise uma empresa"
								value={searchTerm}
								onChange={handleSearch}
							/>
						</IconField>

						<Button
							label="Nova Empresa"
							icon="pi pi-plus-circle"
							className="p-button-primary"
							onClick={() => setOpenModal(true)}
						/>
					</div>
				</header>

				<DataTable
					value={filteredEmpresas}
					showGridlines
					tableStyle={{ minWidth: "10em" }}
					paginator
					rows={10}
					className={styles.table}
					emptyMessage="Nenhuma empresa cadastrada"
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
			</div>
		</div>
	);
}
