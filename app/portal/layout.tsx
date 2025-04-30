'use client'
import SideBar from "@/components/portal/sideBar";
import React, { useState, useEffect } from "react";
import styles from "./layout.module.scss"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Função auxiliar para verificar a validade do token
const isTokenExpired = (token: any) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000; // Conversão para milissegundos
        return Date.now() > expiry;
    } catch (e) {
        return true;
    }
};

const PortalPageLayout = ({ children, login }: { children: React.ReactElement; login: React.ReactElement }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // AUTENTICACAO TIRADA, DEPOIS ALTERAR OARA FALSE

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                window.location.reload();
            } else {
                setIsAuthenticated(true);
                toast.success("Login bem sucedido. Bem Vindo!")
            }
        }

    }, []);

    return isAuthenticated ? <div className={styles.main}><SideBar/> <ToastContainer/>{children} </div> : <div>{login}</div>;
}

export default PortalPageLayout;
