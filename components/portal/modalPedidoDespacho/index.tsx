import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import PrimeButton from "../button/index"
import ButtonCustom from "../../../components/portal/button";

import axios from "axios";
import styles from "./styles.module.scss";
import Image from "next/image";
import DocIcon from "../../../public/images/pedido-de-dispacho-icon.svg";
import InfoIcon from "../../../public/images/seta-info-certificado.svg";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { CheckboxChangeEvent } from "primereact/checkbox";
import { Nova_Cut, Turret_Road } from "next/font/google";
import { ProgressSpinner } from "primereact/progressspinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";

interface Embarcacao {
  Inscricao: string;
  Embarcacao: string;
  Empresa: Empresa;
}

interface Tripulante {
  Documento: string;
  Nome: string;
}

interface Empresa {
  Codigo: number;
  Empresa: string;
}
interface Navegacao {
  Codigo_da_area_de_navegacao: string;
  Descricao: string;
  embarcacao: Embarcacao[];
}
interface Propulsao {
  Id_propulsao: number;
  Descricao?: string;
  embarcacao: Embarcacao[];
}

interface Atividade {
  Tipo_de_atividade: string;
  Descricao: string;
  embarcacao: Embarcacao[];
}

interface PedidoDespacho {
  Despacho_embarcacao: string;
  Data_do_despacho: string;
  Despacho: string;
  Despacho_como_esperado: string;
  Revalidacao: string;
  VHF_COM_DSC: string;
  VHF_SEM_DSC: string;
  Transponder_9GHz: string;
  Frequencia: string;
  Despacho_comandante: string;
  Despacho_obs: string;
  Porto_de_Estadia: string;
  Certificado_ou_documento_temporario1?: string;
  Certificado_ou_documento_temporario2: string;
  Informacao_sobre_vencimento_do_certificado_ou_documento: string;
}

interface ModalDespachoCadastroProps {
  onClose: () => void;
  onSuccess: () => void;
  despacho?: PedidoDespacho | null;
}

const ModalDespachoCadastro: React.FC<ModalDespachoCadastroProps> = ({
  onClose,
  onSuccess,
  despacho,
}) => {
  const [embarcacoes, setEmbarcacoes] = useState<Embarcacao[]>([]);
  const [tripulantes, setTripulantes] = useState<Tripulante[]>([]);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [navegacao, setNavegacao] = useState<Navegacao | null>(null);
  const [propulsao, setPropulsao] = useState<Propulsao | null>(null);
  const [atividade, setAtividade] = useState<Atividade | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [novoDespacho, setNovoDespacho] = useState<PedidoDespacho>({
    Despacho_embarcacao: "",
    Data_do_despacho: "",
    Despacho: "",
    Despacho_como_esperado: "",
    Revalidacao: "",
    VHF_COM_DSC: "",
    VHF_SEM_DSC: "",
    Transponder_9GHz: "",
    Frequencia: "",
    Despacho_comandante: "",
    Despacho_obs: "",
    Porto_de_Estadia: "",
    Certificado_ou_documento_temporario1: "",
    Certificado_ou_documento_temporario2: "",
    Informacao_sobre_vencimento_do_certificado_ou_documento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      [name]: value,
    }));
  };

  const handleComandanteChange = async (e: any, name: string) => {
    const { value } = e.target;
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      [name]: value,
    }));
  };
  const handleDateChange = (e: any) => {
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      Data_do_despacho: e.value
    }));
  };
  async function buscaEmpresaPropulsaoAtividadeNavegacao(value: any) {
    const token = localStorage.getItem('token');

    try {
      setIsLoading(true);
      const responseEmpresa = await axios.get(
        `/api/portal/empresa/getEmpresaByEmbarcacao`,
        {
          params: { inscricao: value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const responseNavegacao = await axios.get(
        "/api/portal/navegacao/getNavegacaoByEmbarcacao",
        {
          params: { inscricao: value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const responsePropulsao = await axios.get(
        "/api/portal/propulsao/getPropulsaoByEmbarcacao",
        {
          params: { inscricao: value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const responseAtividade = await axios.get(
        "/api/portal/atividade/getAtividadeByEmbarcacao",
        {
          params: { inscricao: value },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setIsLoading(false);

      setEmpresa(responseEmpresa.data);
      setNavegacao(responseNavegacao.data);
      setPropulsao(responsePropulsao.data);
      setAtividade(responseAtividade.data);
      setNovoDespacho((prevDespacho) => ({
        ...prevDespacho,
      }));

    } catch (error) {
      console.error("Erro ao buscar as entidades relacionadas:", error);
    }
  }
  const handleDropdownChange = async (e: any, name: string) => {
    const { value } = e.target;
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      [name]: value,
    }));

    setIsLoading(true);

    await buscaEmpresaPropulsaoAtividadeNavegacao(value);
    setIsLoading(false);
  };
  const [despachoErrors, setDespachoErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const validateDespachoFields = () => {
    console.log("Erro")
    const newErrors: { [key: string]: boolean } = {};

    if (!novoDespacho.Despacho_embarcacao) newErrors.Despacho_embarcacao = true;
    //if (!novoDespacho.Data_do_despacho) newErrors.Data_do_despacho = true;
    //if (!novoDespacho.Porto_de_Estadia) newErrors.Porto_de_Estadia = true;
    //if (!novoDespacho.Despacho_obs) newErrors.Despacho_obs = true;
    //if (!novoDespacho.Frequencia) newErrors.Frequencia = true;
    //if (!novoDespacho.Despacho_comandante) newErrors.Despacho_comandante = true;

    setDespachoErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    if (!validateDespachoFields()) {
      return toast.error("Por favor, preencha todos os campos obrigatórios.");
    } else {

      setLoadingSubmit(true)
      const token = localStorage.getItem("token");
      const url = despacho
        ? "/api/portal/pedidoDespacho/updateDispatchRequest"
        : "/api/portal/pedidoDespacho/createDispatchRequest";
      const method = despacho ? "put" : "post";
      try {
        await axios[method](url, novoDespacho, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // if (method === "put") {
        //   setLoadingSubmit(false)

        //   toast.success("Pedido de Despacho atualizado com sucesso!");
        //   onClose();
        // } else {
        //   setLoadingSubmit(true)

        //   toast.success("Pedido de despacho criado com sucesso!");
        //   onClose();
        // }

        onSuccess()
      } catch (error) {
        setLoadingSubmit(true)

        toast.error("Erro ao cadastrar a pedido de despacho!");
      }
    }
  };

  useEffect(() => {
    const fetchEmbarcacoesETripulantes = async () => { const token = localStorage.getItem('token');
      try {
        const responseEmbarcacoes = await axios.get(
          "/api/portal/embarcacao/readVessel",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        const embarcacoesLimpas = responseEmbarcacoes.data.map((embarcacao: any) => ({
          ...embarcacao,
          Embarcacao: embarcacao.Embarcacao.replace(/"/g, "") // Remove todas as aspas duplas
        })).sort((a:any, b:any) => a.Embarcacao.localeCompare(b.Embarcacao));
        setEmbarcacoes(embarcacoesLimpas);
        const responseTripulantes = await axios.get(
          "/api/portal/tripulantes/readCrew",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const tripulantesLimpos = responseTripulantes.data.map((tripulante: any) => ({
          ...tripulante,
          Nome: tripulante.Nome.replace(/"/g, "") // Remove todas as aspas duplas
        })).sort((a: any, b: any) => a.Nome.localeCompare(b.Nome));
        
        setTripulantes(tripulantesLimpos);
      } catch (error) {
        console.error("Erro ao buscar embarcação ou tripulante.");
      }
    };

    fetchEmbarcacoesETripulantes();

    if (despacho) {
      setNovoDespacho(despacho);
      buscaEmpresaPropulsaoAtividadeNavegacao(despacho.Despacho_embarcacao);
    } else {
      setNovoDespacho({
        Despacho_embarcacao: "",
        Data_do_despacho: "",
        Despacho: "",
        Despacho_como_esperado: "",
        Revalidacao: "",
        VHF_COM_DSC: "",
        VHF_SEM_DSC: "X",
        Transponder_9GHz: "",
        Frequencia: "",
        Despacho_comandante: "",
        Despacho_obs: "",
        Porto_de_Estadia: "",
        Certificado_ou_documento_temporario1: "",
        Certificado_ou_documento_temporario2: "",
        Informacao_sobre_vencimento_do_certificado_ou_documento: "",
      });
    }
  }, [despacho]);

  const [certificado, setCertificado] = useState(false);

  const handleCertificadoChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    const certificadoValue = checked ? "X" : "";
    if (checked === true) {
      setNovoDespacho((prevDespacho) => ({
        ...prevDespacho,
        Certificado_ou_documento_temporario2: certificadoValue,
        Certificado_ou_documento_temporario1: " ",
      }));
    } else {
      setNovoDespacho((prevDespacho) => ({
        ...prevDespacho,
        Certificado_ou_documento_temporario2: " ",
        Certificado_ou_documento_temporario1: "X",
      }));
    }
    Handleconsole();
  };
  const handleTransponder = (e: CheckboxChangeEvent) => {
    const { checked } = e;
    const transponderValue = checked ? "X" : "";

    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      Transponder_9GHz: transponderValue,
    }));
    Handleconsole();
  };

  function Handleconsole() {
    console.log(novoDespacho);
  }

  const handlerRevalidacao = (e: CheckboxChangeEvent) => {
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      Revalidacao: e.checked ? 'X' : ''
    }));
    Handleconsole();
  }

  const handlerDespacho = (e: CheckboxChangeEvent) => {
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      Despacho: e.checked ? 'X' : ''
    }));

    Handleconsole();
  }

  const handlerRadioVhf = (e: CheckboxChangeEvent) => {
    setNovoDespacho((prevDespacho) => ({
      ...prevDespacho,
      VHF_COM_DSC: e.checked ? 'X' : '',
      VHF_SEM_DSC: e.checked ? '' : 'X'
    }));

    Handleconsole();
  };

  return (
    <>
      <Dialog
        visible={true}
        closable={false}
        onHide={onClose}
        headerClassName={styles.modal}
        contentClassName={styles.modal}
      >

        <div className={styles.form}>
          <div className={styles.title}>
            <Image src={DocIcon} alt="Logo" />
            <a>Novo Pedido de Despacho</a>
          </div>
          {/* INFORMACOES */}
          <div className={styles.informacoes}>
            <div className={styles.containerLinha}>
              <div className={styles.linha}></div>
              <div className={styles.texto}>Informações</div>
              <div className={styles.linha}></div>
            </div>
            {/* EMBARCACAO E INSCRICAO */}
            <div className={styles.embarcacaoInscricao}>
              <div className={styles.opcao}>
                <a>Embarcação:</a>
                <Dropdown
                  placeholder="Selecione a Embarcação"
                  id="embarcacaoDropDown"
                  name="Despacho_embarcacao"
                  optionLabel="Embarcacao"
                  optionValue="Inscricao"
                  value={novoDespacho.Despacho_embarcacao}
                  options={embarcacoes}
                  className={`${styles.inputText} ${despachoErrors.Despacho_embarcacao ? styles.error : ""
                    }`}
                  onChange={(e) => handleDropdownChange(e, "Despacho_embarcacao")}
                />
              </div>
              <div className={styles.opcao}>
                <a>Inscrição:</a>
                <InputText
                  id="inscricao"
                  name="Inscricao"
                  value={novoDespacho.Despacho_embarcacao}
                  className={`${styles.inputText} ${despachoErrors.Despacho_embarcacao ? styles.error : ""
                    }`}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            {/* EMPRESA */}
            <div className={styles.opcao}>
              <a>Empresa:</a>
              <InputText
                id="empresa"
                name="Empresa"
                value={empresa?.Empresa}
                className={styles.inputText}
                onChange={handleChange}
                disabled
              />{" "}
              {isLoading ? (
                <div className={styles["spinner-container"]}>
                  <ProgressSpinner
                    style={{ width: "20px", height: "20px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            {/* NAVEGACAO PROPULSAO E ATIVIDADE */}
            <div className={styles.navPropulsaoAtvd}>
              <div className={styles.opcao}>
                <a>Navegação:</a>
                <InputText
                  id="navegacao"
                  name="Navegacao"
                  value={navegacao?.Descricao}
                  className={styles.inputText}
                  onChange={handleChange}
                  disabled
                />
                {isLoading ? (
                  <div className={styles["spinner-container"]}>
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.opcao}>
                <a>Propulsão:</a>
                <InputText
                  id="propulsao"
                  name="Propulsao"
                  value={propulsao?.Descricao}
                  className={styles.inputText}
                  onChange={handleChange}
                  disabled
                />
                {isLoading ? (
                  <div className={styles["spinner-container"]}>
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.opcao}>
                <a>Atividade:</a>
                <InputText
                  id="atividade"
                  name="Atividade"
                  value={atividade?.Descricao}
                  className={styles.inputText}
                  onChange={handleChange}
                  disabled
                />
                {isLoading ? (
                  <div className={styles["spinner-container"]}>
                    <ProgressSpinner
                      style={{ width: "20px", height: "20px" }}
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration=".5s"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className={styles.informacoes}>
            <div className={styles.containerLinha}>
              <div className={styles.linha}></div>
              <div className={styles.texto}>Especificações</div>
              <div className={styles.linha}></div>
            </div>
            {/* EMBARCACAO E INSCRICAO */}
            <div className={styles.comandanteEDespachoInfo}>
              <div className={styles.opcao}>
                <a>Comandante:</a>
                <Dropdown
                  placeholder="Selecione o Comandante"
                  id="comandanteDropDown"
                  name="Despacho_comandante"
                  optionLabel="Nome"
                  optionValue="Nome"
                  value={novoDespacho.Despacho_comandante}
                  options={tripulantes}
                  className={`${styles.inputText} ${despachoErrors.Despacho_comandante ? styles.error : ""
                    }`}
                  onChange={(e) =>
                    handleComandanteChange(e, "Despacho_comandante")
                  }
                />
              </div>
              <div className={styles.opcao}>
                <a>Despacho:</a>
                <Checkbox
                  checked={novoDespacho.Despacho === "X"}
                  onChange={handlerDespacho}
                  className={styles.customCheckbox}
                />
              </div>
              <div className={styles.opcao}>
                <a>Revalidação: </a>
                <Checkbox
                  checked={novoDespacho.Revalidacao === "X"}
                  onChange={handlerRevalidacao}
                  className={styles.customCheckbox}
                />
              </div>
            </div>

            <div className={styles.despachoEsperadoEVhf}>
              <div className={styles.opcao}>
                <a>Despacho como esperado:</a>
                <InputText
                  id="despacho_como_esperado"
                  name="Despacho_como_esperado"
                  value={novoDespacho.Despacho_como_esperado}
                  className={styles.inputText}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.dataPortoDeEstadia}>
              <div className={styles.opcao}>
                <a>Data do despacho:</a>
                {/* <Calendar value={novoDespacho.Data_do_despacho} onChange={handleChange} showIcon /> */}

                <InputMask value={novoDespacho.Data_do_despacho}
                  onChange={handleDateChange}
                  mask="99/99/9999"
                  className={`${styles.inputText} ${despachoErrors.Data_do_despacho ? styles.error : ""
                    }`}
                  slotChar="dd/mm/yyyy" />


                {/* <InputText
                  id="data_do_despacho"
                  name="Data_do_despacho"
                  value={novoDespacho.Data_do_despacho}
                  className={`${styles.inputText} ${despachoErrors.Data_do_despacho ? styles.error : ""
                    }`}
                  onChange={handleChange}
                /> */}
              </div>
              <div className={styles.opcao}>
                <a>Porto de Estadia:</a>
                <InputText
                  id="porto_de_estadia"
                  name="Porto_de_Estadia"
                  value={novoDespacho.Porto_de_Estadia}
                  className={`${styles.inputText} ${despachoErrors.Porto_de_Estadia ? styles.error : ""
                    }`}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* OBSERVACAO */}
            <div className={styles.opcao}>
              <a>Observações:</a>
              <InputText
                id="observacoes"
                name="Despacho_obs"
                value={novoDespacho.Despacho_obs}
                className={`${styles.inputText} ${despachoErrors.Despacho_obs ? styles.error : ""
                  }`}
                onChange={handleChange}
              />
            </div>
            {/* RADIO, FREQUENCIA E TRANSPONDER */}

            <div className={styles.radioFreqTransponder}>
              <div className={styles.opcao}>
                <a>Frequência:</a>
                <InputText
                  id="frequencia"
                  name="Frequencia"
                  value={novoDespacho.Frequencia}
                  className={`${styles.inputText} ${despachoErrors.Frequencia ? styles.error : ""
                    }`}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.opcao}>
                <a>Radio VHF com DSC:</a>
                <Checkbox
                  checked={novoDespacho.VHF_COM_DSC === "X"}
                  onChange={handlerRadioVhf}
                  className={styles.customCheckbox}
                />
              </div>
              <div className={styles.opcao}>
                <a>Transponder - 9GHz:</a>
                <Checkbox
                  checked={novoDespacho.Transponder_9GHz === "X"}
                  onChange={handleTransponder}
                  className={styles.customCheckbox}
                />
              </div>
            </div>
            <div className={styles.certificados}>
              <div className={styles.opcao}>
                <a>Certificado ou Documento Temporário:</a>
                <Checkbox
                  name="Certificado_ou_documento_temporario1"
                  checked={
                    novoDespacho.Certificado_ou_documento_temporario2 === "X"
                  }
                  onChange={handleCertificadoChange}
                  className={styles.customCheckbox}
                />
              </div>

              <div className={styles.infoCertificado}>
                <Image src={InfoIcon} alt="Logo" />
                <div className={styles.opcao}>
                  <a>Informações:</a>
                  <InputText
                    id="informacoes_vencimento"
                    name="Informacao_sobre_vencimento_do_certificado_ou_documento"
                    value={
                      novoDespacho.Informacao_sobre_vencimento_do_certificado_ou_documento
                    }
                    className={`${styles.inputText} ${despachoErrors.Informacao_sobre_vencimento_do_certificado_ou_documento
                      ? styles.error
                      : ""
                      }`}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

          </div>
          <div className={styles.botoes}>
            <PrimeButton
              tipoBotao="cancelar"
              title="Cancelar"
              onClick={onClose}
              tamanho="10em"
            />
            {loadingSubmit == true ? <PrimeButton
              tipoBotao="normal"
              title={

                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="8"
                  animationDuration=".5s"
                />
              }
              disabled
              tamanho="10em"
            /> :
              <PrimeButton
                tipoBotao="normal"
                title={despacho ? "Atualizar" : "Salvar"}
                disable={isLoading}
                onClick={handleSubmit}
                tamanho="10em"
              />}

          </div>
        </div>
      </Dialog>


      <ToastContainer position="top-right" />
    </>

  );
};

export default ModalDespachoCadastro;
