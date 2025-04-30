'use client'

import Styles from "./perguntas.module.scss";
import { useState } from 'react';

const Perguntas = () => {
    const [respostaVisivel, setRespostaVisivel] = useState([false,false,false,false]);
    const [btnTipo, setBtnTipo] = useState('add');

    const handleBotaoClick = (index: number) => {
        setRespostaVisivel((prevRespostas) =>
          prevRespostas.map((visivel, i) => (i === index ? !visivel : visivel))
        );
    };

    const iconeBotao = (index: number) => {
        if(respostaVisivel[index]){
            return "remove"
        }else{
            return "add"
        }
    }

    const tipoBotao = (index: number) => {
        if(respostaVisivel[index]){
            return Styles.btnContrair
        }else{
            return Styles.btnExpandir
        }
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.titulo}>
                <h1>Perguntas Frequentes</h1>
            </div>

            <div className={Styles.conteudo}>
               <div className={Styles.cardPergunta}>
                    <div className={Styles.tituloCard}>
                        <h3>Renovação ou 2ª Via da CIR?</h3>
                        <button onClick={() => handleBotaoClick(0)} className={tipoBotao(0)}><span className="material-symbols-outlined">{iconeBotao(0)}</span></button>
                    </div>
                    {respostaVisivel[0] && <p className={Styles.respostaCard}>A renovação é a revalidação da Caderneta de Inscrição e Registro (CIR) que se encontra fora de validade. Já a 2ª Via é usada no caso de Extravio, Dano, Roubo ou Furto da mesma. Sendo necessário o recadastramento de uma nova Caderneta de Inscrição e Registro (CIR).</p>}
               </div>

               <div className={Styles.cardPergunta}>
                    <div className={Styles.tituloCard}>
                        <h3>O que é TIE - TITULO DE INSCRIÇÃO DE EMBARCAÇÃO?</h3>
                        <button onClick={() => handleBotaoClick(1)} className={tipoBotao(1)}><span className="material-symbols-outlined">{iconeBotao(1)}</span></button>
                    </div>
                    {respostaVisivel[1] && <p className={Styles.respostaCard}>É o documento que comprova a inscrição de uma embarcação com arqueação bruta de até 99 AB. Todas as embarcações deverão ser inscritas nas Capitanias, Delegacias e Agências da Marinha do Brasil.</p>}
               </div>

               <div className={Styles.cardPergunta}>
                    <div className={Styles.tituloCard}>
                        <h3>O que é PRPM - Provisão de Registro de Propriedade Marítima?</h3>
                        <button onClick={() => handleBotaoClick(2)} className={tipoBotao(2)}><span className="material-symbols-outlined">{iconeBotao(2)}</span></button>
                    </div>
                    {respostaVisivel[2] && <p className={Styles.respostaCard}>É o documento que comprova a inscrição de uma embarcação com arqueação bruta acima de 100 AB e terão obrigatoriedade de ser registradas junto ao Tribunal Marítimo.</p>}
               </div>

               <div className={Styles.cardPergunta}>
                    <div className={Styles.tituloCard}>
                        <h3>O que é CRA - Certificado de Registro de Armador?</h3>
                        <button onClick={() => handleBotaoClick(3)} className={tipoBotao(3)}><span className="material-symbols-outlined">{iconeBotao(3)}</span></button>
                    </div>
                    {respostaVisivel[3] && <p className={Styles.respostaCard}>As empresas que utilizam suas embarcações para uso comercial, após a inscrição de uma embarcação, deverão solicitar junto ao Tribunal Marítimo o certificado de registro de armador, para dar inicio as atividades comerciais.</p>}
               </div>
            </div>
        </div>
    )
}

export default Perguntas