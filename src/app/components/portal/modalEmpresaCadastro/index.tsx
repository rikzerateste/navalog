import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import SuithCase from "/public/images/suitcase.svg";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputMask } from "primereact/inputmask";
import { Estado, getEstados } from "@/services/estados";
import { Empresa, createEmpresa, updateEmpresa } from "@/services/empresas";
import { useToast } from "@/hooks/useToast";

interface ModalEmpresaCadastroProps {
	isOpen: boolean;
	empresa?: Empresa | null;
	onClose: () => void;
	onSuccess: () => void;
}

export default function ModalEmpresaCadastro({
	isOpen,
	empresa,
	onClose,
}: ModalEmpresaCadastroProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<Empresa>({
		defaultValues: Object.fromEntries(
			Object.entries(empresa || {}).map(([key, value]) => [key, value || ""])
		) as Empresa,
	});

	const { showToast } = useToast();

	const [estados, setEstados] = useState<Estado[]>([]);
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		setEstados(getEstados());
	}, []);

	useEffect(() => {
		setEditing(!!empresa);
	}, [empresa]);

	const onSubmit: SubmitHandler<Empresa> = async (data) => {
		setLoading(true);

		if (editing) {
			await updateEmpresa(data);
			showToast("Sucesso", "Empresa atualizada com sucesso", "success");
			setLoading(false);
			return;
		}

		await createEmpresa(data);
		setLoading(false);
		showToast("Sucesso", "Empresa cadastrada com sucesso", "success");
	};

	return (
		<Dialog
			visible={isOpen}
			closable={false}
			onHide={onClose}
			headerClassName={styles.modal}
			contentClassName={styles.modal}
		>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.title}>
					<Image src={SuithCase} alt="Logo" />
					<h4>{editing ? "Editar" : "Nova"} Empresa</h4>
				</div>

				<div className={styles.informacoes}>
					<div className={styles.opcao}>
						<label htmlFor="empresa">
							Empresa <span className={styles.required}>*</span>
						</label>

						<InputText className={styles.input} {...register("Empresa")} />
					</div>

					<div className={styles.formGroup}>
						<div className={styles.opcao}>
							<label>
								CNPJ<span className={styles.required}>*</span>
							</label>

							<InputMask
								className={styles.input}
								mask="99.999.999/9999-99"
								{...register("CNPJ")}
							/>
						</div>

						<div className={styles.opcao}>
							<label>Inscrição Estadual</label>
							<InputText
								className={styles.input}
								{...register("Inscricao_Estadual")}
							/>
						</div>
					</div>

					<div className={styles.formGroup}>
						<div className={styles.opcao}>
							<label>
								Certificado de Registro de Armador
								<span className={styles.required}>*</span>
							</label>

							<InputText
								className={styles.input}
								{...register("Empresa_certificado")}
							/>
						</div>

						<div className={styles.opcao}>
							<label>
								Vencimento<span className={styles.required}>*</span>
							</label>

							<InputMask
								{...register("Empresa_vencecert")}
								mask="99/99/9999"
								className={styles.input}
							/>
						</div>
					</div>

					<div className={styles.informacoes}>
						<div className={styles.separator}>
							<p>Endereço</p>
							<hr />
						</div>

						<div className={styles.formGroup}>
							<div className={styles.opcao}>
								<label>
									Endereço<span className={styles.required}>*</span>
								</label>

								<InputText className={styles.input} {...register("Endereco")} />
							</div>

							<div className={styles.opcao}>
								<label>
									Nº <span className={styles.required}>*</span>
								</label>

								<InputText className={styles.input} {...register("Num")} />
							</div>
						</div>

						<div className={styles.formGroup}>
							<div className={styles.opcao}>
								<label>
									Bairro <span className={styles.required}>*</span>
								</label>

								<InputText className={styles.input} {...register("Bairro")} />
							</div>

							<div className={styles.opcao}>
								<label>
									CEP <span className={styles.required}>*</span>
								</label>

								<InputMask
									className={styles.input}
									{...register("Cep")}
									mask="99999-999"
								/>
							</div>
						</div>

						<div className={styles.formGroup}>
							<div className={styles.opcao}>
								<label>
									Cidade <span className={styles.required}>*</span>
								</label>

								<InputText className={styles.input} {...register("Cidade")} />
							</div>

							<div className={styles.opcao}>
								<label>
									Estado <span className={styles.required}>*</span>
								</label>

								<Dropdown
									value={watch("UF")}
									className={styles.dropdown}
									onChange={(e) => setValue("UF", e.value)}
									options={estados}
									optionLabel="name"
									optionValue="sigla"
									placeholder="Selecione um estado"
								/>
							</div>
						</div>
					</div>

					<div className={styles.informacoes}>
						<div className={styles.separator}>
							<p>Representante</p>
							<hr />
						</div>

						<div className={styles.formGroup}>
							<div className={styles.opcao}>
								<label>
									Email<span className={styles.required}>*</span>
								</label>
								<InputText className={styles.input} {...register("Email")} />
							</div>

							<div className={styles.opcao}>
								<label>
									Contato<span className={styles.required}>*</span>
								</label>
								<InputText className={styles.input} {...register("Contato")} />
							</div>
						</div>

						<div className={styles.formGroup}>
							<div className={styles.opcao}>
								<label>Fone 1</label>
								<InputMask
									className={styles.input}
									{...register("Fone_1")}
									mask="(99) 99999-9999"
								/>
							</div>

							<div className={styles.opcao}>
								<label>Fone 2</label>
								<InputMask
									className={styles.input}
									{...register("Fone_2")}
									mask="(99) 99999-9999"
								/>
							</div>

							<div className={styles.opcao}>
								<label>Celular</label>
								<InputMask
									className={styles.input}
									{...register("Celular")}
									mask="(99) 99999-9999"
								/>
							</div>
						</div>
					</div>

					<footer className={styles.buttons}>
						<Button label="Cancelar" onClick={onClose} severity="secondary" />
						<Button loading={loading} label="Salvar" type="submit" />
					</footer>
				</div>
			</form>
		</Dialog>
	);
}
