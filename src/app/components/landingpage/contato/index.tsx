'use client';

import { useState } from "react";
import { handleClientScriptLoad } from "next/script";
import { ST } from "next/dist/shared/lib/utils"
import axios from "axios"
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../button"
import Styles from "./contato.module.scss"
import { SuccessModal } from "../successModal";
import { FailModal } from "../failModal";
import { Loading } from "../loading";



const Contato = () => {

    const [isLoading, setLoading] = useState(false)
    const [successModal, setModalSuccess] = useState(false);
    const [failModal, setModalFail] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Campo obrigatório"),
            email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
            message: Yup.string().required("Campo obrigatório"),
        }),
        onSubmit: (values) => handleSubmitForm(values),
    });

    const handleSubmitForm = (values: { name: string; email: string; message: string; }) => {
        setLoading(true)
        axios
        .post("/api/sendEmail", {messageBody: `Nome: ${values.name}\nEmail: ${values.email}\n\nMensagem: ${values.message}`, nameBody:values.name})
        .then(() => {formik.resetForm();setModalSuccess(true);setLoading(false);})
        .catch(() => {setLoading(false);setModalSuccess(true);})
    }

    const closeModal = () => {
        setModalSuccess(false);
        setModalFail(false);
    };


    return (
        <>
            {successModal && <SuccessModal closeModal={closeModal} />}
            {failModal && <FailModal closeModal={closeModal} />}
            {/* {isLoading && <Loading/>} */}
            <div className={Styles.container}>
                <div className={Styles.conteudo}>
                    <div className={Styles.titulo}>
                        <h1>Entre em contato</h1>
                        <p>Atendemos de segunda a sexta das 07:30 às 12:00 - 13:30 às 17:00. Obrigado por considerar a W.S. Comércio e Despachos Fluviais como seu parceiro confiável.</p>
                    </div>

                    <div className={Styles.forms}>
                        <form id="formulario" onSubmit={formik.handleSubmit}>
                            <div className={Styles.inputWrapper}>
                                <span className="material-symbols-rounded">account_circle</span>
                                <input id="name" name="name" type="text" placeholder="Nome completo" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} required/>
                            </div>
                            
                            <div className={Styles.inputWrapper}>
                            <span className="material-symbols-rounded">alternate_email</span>
                                <input id="email" name="email" type="email" placeholder="E-mail" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} required/>
                            </div>
                            
                            <div className={Styles.inputWrapper}>
                                <span className="material-symbols-rounded">sms</span>
                                <input id="message" name="message" type="text" placeholder="Mensagem" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.message} required/>
                            </div>        
                            
                            {/* <Button type={"submit"} title={"Enviar"} kind={"enviarForm"}/> */}
                            {isLoading ? (<Loading />) : (<Button type={"submit"} title={"Enviar"} kind={"enviarForm"} onClick={function (): void {} }/>)}
                        </form>
                        <div className={Styles.legendaForms}>
                            <p>wsdespachantefluvial@gmail.com</p>
                            <p>(14) 3641-1680 /  (14) 3641-4141</p>
                        </div>
                    </div>
                </div>

                <div className={Styles.mapa}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7372.50405603131!2d-48.56325291671458!3d-22.49472541119266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c74f7d2f4993b7%3A0x7385fc62826dd20d!2sWS%20Com%C3%A9rcio%20Despachos%20Fluviais!5e0!3m2!1spt-BR!2sbr!4v1712512761888!5m2!1spt-BR!2sbr" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={Styles.iframe}></iframe>
                </div>
            </div>
        </>
    )
}

export default Contato