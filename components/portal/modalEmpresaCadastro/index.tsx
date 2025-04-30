import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import styles from "./styles.module.scss"
import Image from "next/image";
import SuithCase from "../../../public/images/suitcase.svg"
import { Dropdown } from "primereact/dropdown";
import PrimeButton from "../button/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputMask } from "primereact/inputmask";

interface Empresa {
  Codigo?: string;
  Empresa: string;
  Endereco?: string;
  Num?: string;
  Cidade?: string;
  Bairro?: string;
  Cep?: string;
  UF?: string;
  CNPJ?: string;
  Inscricao_Estadual?: string;
  Contato?: string;
  Fone_1?: string;
  Fone_2?: string;
  Celular?: string;
  Email?: string;
  Empresa_certificado?: string;
  Empresa_vencecert?: string;
}

interface ModalEmpresaCadastroProps {
  onClose: () => void;
  onSuccess: () => void;
  empresa?: Empresa | null;
}

const ModalEmpresaCadastro: React.FC<ModalEmpresaCadastroProps> = ({ onClose, onSuccess, empresa }) => {

  const [selectedEstados, setSelectedEstados] = useState<{ name: string; sigla: string; } | null>(null);

  const estados = [
    { name: "Acre", sigla: "AC" },
    { name: "Alagoas", sigla: "AL" },
    { name: "Amapá", sigla: "AP" },
    { name: "Amazonas", sigla: "AM" },
    { name: "Bahia", sigla: "BA" },
    { name: "Ceará", sigla: "CE" },
    { name: "Distrito Federal", sigla: "DF" },
    { name: "Espírito Santo", sigla: "ES" },
    { name: "Goiás", sigla: "GO" },
    { name: "Maranhão", sigla: "MA" },
    { name: "Mato Grosso", sigla: "MT" },
    { name: "Mato Grosso do Sul", sigla: "MS" },
    { name: "Minas Gerais", sigla: "MG" },
    { name: "Pará", sigla: "PA" },
    { name: "Paraíba", sigla: "PB" },
    { name: "Paraná", sigla: "PR" },
    { name: "Pernambuco", sigla: "PE" },
    { name: "Piauí", sigla: "PI" },
    { name: "Rio de Janeiro", sigla: "RJ" },
    { name: "Rio Grande do Norte", sigla: "RN" },
    { name: "Rio Grande do Sul", sigla: "RS" },
    { name: "Rondônia", sigla: "RO" },
    { name: "Roraima", sigla: "RR" },
    { name: "Santa Catarina", sigla: "SC" },
    { name: "São Paulo", sigla: "SP" },
    { name: "Sergipe", sigla: "SE" },
    { name: "Tocantins", sigla: "TO" }

  ];
  const [visible, setVisible] = useState(false);
  const [novaEmpresa, setNovaEmpresa] = useState<Empresa>({
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

  const [editing, setEditing] = useState(false);

  const handleEstadoChange = (e: any) => {

    const estadoSelecionado = e.value;
    console.log(estadoSelecionado.name);

    setSelectedEstados(estadoSelecionado.name);
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      UF: estadoSelecionado.name,  // Certifique-se de usar a propriedade correta, UF em maiúsculo
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [name]: value,
    }));
  };

  const criarEmpresa = async () => {
    try {
      console.log('Enviando dados para o backend:', novaEmpresa);
      const res = await axios.post("/api/portal/empresa/createCompanyTeste", novaEmpresa);
      setNovaEmpresa({
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
      setVisible(false);

    } catch (error: any) {
      console.error("Erro ao adicionar a nova empresa:", error);
      alert(`Erro ao adicionar a nova empresa: ${error.response?.data?.error || error.message}`);
    }
  };

  useEffect(() => {
    if (empresa) {
      setNovaEmpresa(empresa);
      setSelectedEstados(estados.find((estado) => estado.sigla === empresa.UF) || null);
      setEditing(true); // Está editando

    } else {
      setNovaEmpresa({
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
      setSelectedEstados(null);
      setEditing(false); // Não está editando

    }
  }, [empresa]);

  const [empresaErrors, setEmpresaErrors] = useState<{ [key: string]: boolean }>({});
  const validateEmpresaFields = () => {
    const newErrors: { [key: string]: boolean } = {};

    if (!novaEmpresa.Empresa) newErrors.Empresa = true;
    if (!novaEmpresa.Endereco) newErrors.Endereco = true;
    if (!novaEmpresa.Num) newErrors.Num = true;
    if (!novaEmpresa.Cidade) newErrors.Cidade = true;
    if (!novaEmpresa.Bairro) newErrors.Bairro = true;
    if (!novaEmpresa.Cep) newErrors.Cep = true;
    if (!novaEmpresa.UF) newErrors.UF = true;
    if (!novaEmpresa.CNPJ) newErrors.CNPJ = true;
    if (!novaEmpresa.Contato) newErrors.Contato = true;
    if (!novaEmpresa.Celular) newErrors.Celular = true;
    if (!novaEmpresa.Email) newErrors.Email = true;
    if (!novaEmpresa.Empresa_certificado) newErrors.Empresa_certificado = true;
    if (!novaEmpresa.Empresa_vencecert) newErrors.Empresa_vencecert = true;

    setEmpresaErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  loadingSubmit
  const handleSubmit = async () => {
    if (!validateEmpresaFields()) {
      return toast.error("Por favor, preencha todos os campos obrigatórios.");
    } else {
      setLoadingSubmit(true);
      const token = localStorage.getItem("token");
      const url = empresa ? "/api/portal/empresa/updateCompany" : "/api/portal/empresa/createCompanyTeste";
      const method = empresa ? "put" : "post";

      try {
        const res = await axios[method](url, novaEmpresa, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (method === "put") {
          setLoadingSubmit(false);

          onSuccess();

        }
        else {
          setLoadingSubmit(false);

          toast.success('sssssss cadastro com sucesso!');
          onSuccess();
          // VERIFICAR A DIFERENCA ENTRE O EDIT

        }
        onClose();
      } catch (error) {
        setLoadingSubmit(false);

        toast.error('Erro ao cadastrar a empresa!');
      }
    }
  };

  const handleCnpjChange = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      CNPJ: e.value
    }));
  };
  const handleCepChange = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      Cep: e.value
    }));
  };

  const handleFone1Change = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      Fone_1: e.value
    }));
  };
  const handleFone2Change = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      Fone_2: e.value
    }));
  };

  const handleContatoChange = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      Contato: e.value
    }));
  };

  const handleCelularChange = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      Celular: e.value
    }));
  };
  const handleVencimentoChange = (e: any) => {
    setNovaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      Empresa_vencecert: e.value
    }));
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
            <Image src={SuithCase} alt="Logo" />

            {empresa ? <a>Editar Empresa</a> : <a>Nova Empresa</a>}
          </div>
          {/* INFORMACOES  */}
          <div className={styles.informacoes}>
            <div className={styles.opcao}>
              <label htmlFor="empresa">Empresa<span className={styles.required}>*</span></label>
              <InputText
                id="empresa"
                name="Empresa"
                value={novaEmpresa.Empresa}
                className={`${styles.inputText} ${empresaErrors.Empresa ? styles.error : ''}`}
                onChange={handleChange}
              />



            </div>

            <div className={styles.cnpjInscEstadual}>
              <div className={styles.opcao}>
                <label>CNPJ<span className={styles.required}>*</span></label>
                <InputMask value={novaEmpresa.CNPJ}
                  onChange={handleCnpjChange}
                  mask="99.999.999/9999-99"
                  className={`${styles.inputText} ${empresaErrors.CNPJ ? styles.error : ""
                    }`} />
              </div>
              <div className={styles.opcao}>
                <label>Inscrição Estadual:</label>
                <InputText
                  id="incricaoEstadual"
                  name="Inscricao_Estadual"
                  value={novaEmpresa.Inscricao_Estadual}
                  className={`${styles.inputText} ${empresaErrors.Inscricao_Estadual ? styles.error : ''}`}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.certificadoVencimento}>
              <div className={styles.opcao}>
                <label>Certificado de Registro de Armador<span className={styles.required}>*</span>:</label>

                <InputText
                  id="empresaCertificado"
                  name="Empresa_certificado"
                  value={novaEmpresa.Empresa_certificado}
                  className={`${styles.inputText} ${empresaErrors.Empresa_certificado ? styles.error : ''}`}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.opcao}>
                <label>Vencimento<span className={styles.required}>*</span>:</label>
                <InputMask value={novaEmpresa.Empresa_vencecert}
                  onChange={handleVencimentoChange}
                  mask="99/99/9999"
                  className={`${styles.inputText} ${empresaErrors.Empresa_vencecert ? styles.error : ""
                    }`} />
              </div>
            </div>
            {/* ENDEREÇOS */}
            <div className={styles.informacoes}>
              <div className={styles.containerLinha}>
                <div className={styles.linha}></div>
                <div className={styles.texto}>Endereço</div>
                <div className={styles.linha}></div>
              </div>
              <div className={styles.enderecoNumero}>
                <div className={styles.opcao}>
                <label>Endereço<span className={styles.required}>*</span>:</label>
                <InputText
                  id="endereco"
                  name="Endereco"
                  value={novaEmpresa.Endereco}
                  className={`${styles.inputText} ${empresaErrors.Endereco ? styles.error : ''}`}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.opcao}>
                <label>Nº<span className={styles.required}>*</span>:</label>

                <InputText
                  id="num"
                  name="Num"
                  value={novaEmpresa.Num}
                  className={`${styles.inputText} ${empresaErrors.Num ? styles.error : ''}`}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.bairroCep}>
              <div className={styles.opcao}>
                <label>Bairro<span className={styles.required}>*</span>:</label>
                <InputText
                  id="bairro"
                  name="Bairro"
                  value={novaEmpresa.Bairro}
                  className={`${styles.inputText} ${empresaErrors.Bairro ? styles.error : ''}`}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.opcao}>
                <label>CEP<span className={styles.required}>*</span>:</label>
                <InputMask value={novaEmpresa.Cep}
                  onChange={handleCepChange}
                  mask="99999-999"
                  className={`${styles.inputText} ${empresaErrors.CNPJ ? styles.error : ""
                    }`} />
              </div>
            </div>

            <div className={styles.cidadeEstado}>
              <div className={styles.opcao}>
                <label>Cidade<span className={styles.required}>*</span>:</label>

                <InputText
                  id="cidade"
                  name="Cidade"
                  value={novaEmpresa.Cidade}
                  className={`${styles.inputText} ${empresaErrors.Cidade ? styles.error : ''}`}
                  onChange={handleChange} />
              </div>
              <div className={styles.opcao}>
                <label>Estado<span className={styles.required}>*</span>:</label>
                {/* <InputText
                id="uf"
                name="UF"
                value={novaEmpresa.UF}
                className={styles.inputText}
                onChange={handleChange} /> */}
                <Dropdown id="uf"
                  value={novaEmpresa.UF} options={estados} onChange={(e) => {
                    setSelectedEstados(e.value);
                    setNovaEmpresa((prevEmpresa) => ({ ...prevEmpresa, UF: e.value.sigla }));
                  }} optionLabel="name"
                  editable placeholder="Selecione um estado"
                  className={`${styles.inputText} ${empresaErrors.UF ? styles.error : ''}`} />
              </div>

              {/* id="uf"
            name="UF"
            value={novaEmpresa.UF}
            onChange={handleChange} */}

            </div>
          </div>

            {/* REPRESENTANTES */}
            <div className={styles.informacoes}>
              <div className={styles.containerLinha}>
                <div className={styles.linha}></div>
                <div className={styles.texto}>Representante</div>
                <div className={styles.linha}></div>
              </div>
              <div className={styles.contatoEmail}>
                <div className={styles.opcao}>
                <label>Email<span className={styles.required}>*</span>:</label>
                <InputText
                  id="email"
                  name="Email"
                  type="email"
                  value={novaEmpresa.Email}
                  required
                  className={`${styles.inputText} ${empresaErrors.Email ? styles.error : ''}`}
                  onChange={handleChange}
                />

              </div>
              <div className={styles.opcao}>
                <label>Contato<span className={styles.required}>*</span>:</label>
                <InputText
                    id="contato"
                    name="Contato"
                    value={novaEmpresa.Contato}
                    className={`${styles.inputText} ${empresaErrors.Contato ? styles.error : ''}`}
                    onChange={handleChange}

                  />
                </div>
            </div>



            <div className={styles.numerosInputs}>
              <div className={styles.opcao}>
                <label>Fone 1:</label>
                <InputMask value={novaEmpresa.Fone_1}
                  onChange={handleFone1Change}
                  mask="(99) 99999-9999"
                  className={`${styles.inputText} ${empresaErrors.Fone_1 ? styles.error : ""
                    }`} />
              </div>
              <div className={styles.opcao}>
                <label>Fone 2:</label>
                <InputMask value={novaEmpresa.Fone_2}
                  onChange={handleFone2Change}
                  mask="(99) 99999-9999"
                  className={`${styles.inputText} ${empresaErrors.Fone_2 ? styles.error : ""
                    }`} />
              </div>
              <div className={styles.opcao}>
                <label>Celular</label>
                <InputMask value={novaEmpresa.Fone_2}
                  onChange={handleCelularChange}
                  mask="(99) 99999-9999"
                  className={`${styles.inputText} ${empresaErrors.Fone_2 ? styles.error : ""
                    }`} />
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
                title={editing ? "Atualizar" : "Salvar"}

                onClick={handleSubmit}
                tamanho="10em"
              />}

          </div>

        </div>
        </div>

      </Dialog>

      <ToastContainer />
    </>
  );
}

export default ModalEmpresaCadastro;
