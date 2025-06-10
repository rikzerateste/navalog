"use client";
import { login } from "@/services/auth";
import styles from "./login.module.scss";

import Image from "next/image";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useToast } from "@/hooks/useToast";

export default function Page() {
	const { showToast } = useToast();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!username || !password) {
			return;
		}

		setLoading(true);

		login(username, password)
			.then((res) => {
				const { token } = res;

				if (token) {
					localStorage.setItem("token", token);
					window.location.replace("/portal");
				}
			})
			.catch((err) => {
				if (err.status === 401) {
					showToast(
						"Credenciais inválidas",
						"Usuário ou senha inválidos",
						"error"
					);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<Image src="/images/logo.svg" alt="Logo" width={100} height={100} />
					<h3>WS Sistema</h3>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					<IconField iconPosition="left">
						<InputIcon className="pi pi-user" />
						<InputText
							value={username}
							placeholder="Usuário"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</IconField>

					<IconField iconPosition="left">
						<InputIcon className="pi pi-lock" />
						<InputText
							type="password"
							placeholder="Senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</IconField>

					<Button type="submit" label="Entrar" disabled={loading} />
				</form>
			</div>
		</div>
	);
}
