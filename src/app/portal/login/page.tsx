"use client";
import axios from "axios";

import Image from "next/image";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import Button from "@/components/portal/button";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";

import styles from "./login.module.scss";

export default function Page() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [loginSuccess, setLoginSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (loading) return;

		if (!email || !senha) {
			setErrorMessage("Por favor, preencha todos os campos.");
			return;
		}

		setLoading(true);
		setErrorMessage("");

		try {
			const { data } = await axios.post("/api/portal/autenticacao/login", {
				email,
				senha,
			});

			if (data.token) {
				localStorage.setItem("token", data.token);
				setLoginSuccess(true);
				setLoading(false);
				window.location.replace("/portal"); // Redireciona para a página do portal
			} else {
				setErrorMessage("Usuário e/ou senha estão incorretos.");
				setLoading(false);
			}
		} catch (error) {
			console.error("Erro de login:", error);
			setErrorMessage("Erro no servidor. Tente novamente mais tarde.");
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
					<p>WS Sistema</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className={styles.dadosInputs}>
						<div className="p-inputgroup flex-1">
							<span
								className="p-inputgroup-addon"
								style={{
									background: "rgba(234, 240, 247, 1)",
									border: "none",
									borderRadius: "10px 0 0 10px",
								}}
							>
								<i className="pi pi-user" style={{ opacity: "50%" }}></i>
							</span>
							<InputText
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="text"
								placeholder="Usuário"
								aria-label="Usuário"
								style={{
									background: "rgba(234, 240, 247, 1)",
									border: "none",
									borderRadius: "0 10px 10px 0",
								}}
							/>
						</div>

						<div className="p-inputgroup flex-1">
							<span
								className="p-inputgroup-addon"
								style={{
									background: "rgba(234, 240, 247, 1)",
									border: "none",
									borderRadius: "10px 0 0 10px",
								}}
							>
								<i className="pi pi-lock" style={{ opacity: "50%" }}></i>
							</span>
							<InputText
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
								type="password"
								placeholder="Senha"
								aria-label="Senha"
								style={{
									background: "rgba(234, 240, 247, 1)",
									border: "none",
									borderRadius: "0 10px 10px 0",
								}}
							/>
						</div>

						{errorMessage && <Message severity="error" text={errorMessage} />}
						{loginSuccess && (
							<Message severity="success" text="Login bem-sucedido!" />
						)}

						<Button
							tipoBotao="normal"
							title="Entrar"
							disabled={loading}
							onClick={handleSubmit}
							tamanho="100%"
						/>

						{loading && (
							<div className={styles.spinner}>
								<ProgressSpinner
									style={{ width: "20px", height: "20px" }}
									strokeWidth="8"
									animationDuration=".5s"
								/>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
