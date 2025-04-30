/*
  Warnings:

  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Empresa";

-- CreateTable
CREATE TABLE "atividade" (
    "Tipo_de_atividade" VARCHAR(5) NOT NULL,
    "Descricao" VARCHAR(40),

    CONSTRAINT "atividade_pkey" PRIMARY KEY ("Tipo_de_atividade")
);

-- CreateTable
CREATE TABLE "CTS" (
    "CTS_controle" SERIAL NOT NULL,
    "Embarcacao" TEXT NOT NULL,
    "Data_emissao" TEXT,

    CONSTRAINT "CTS_pkey" PRIMARY KEY ("CTS_controle")
);

-- CreateTable
CREATE TABLE "TripulanteCTS" (
    "id" SERIAL NOT NULL,
    "Categoria" TEXT NOT NULL,
    "Nivel" TEXT NOT NULL,
    "Quantidade" INTEGER NOT NULL,
    "CTSId" INTEGER NOT NULL,
    "Tipo_de_Tripulante" TEXT NOT NULL,

    CONSTRAINT "TripulanteCTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "embarcacao" (
    "Empresa" INTEGER,
    "Inscricao" VARCHAR(20) NOT NULL,
    "Embarcacao" VARCHAR(100) NOT NULL,
    "Arqueacao_Bruta" VARCHAR(10),
    "Registro_Tribunal_Maritimo" VARCHAR(10),
    "Seguro" VARCHAR(10),
    "Tonelagem_porte_bruto" VARCHAR(10),
    "Tonelagem_porte_liquido" VARCHAR(10),
    "Observacao" VARCHAR(10),
    "Navegacao" VARCHAR(10),
    "Id_propulsao" INTEGER,
    "Atividade" VARCHAR(5),
    "Comprimento_Total" VARCHAR(10),

    CONSTRAINT "embarcacao_pkey" PRIMARY KEY ("Inscricao")
);

-- CreateTable
CREATE TABLE "empresa" (
    "Codigo" SERIAL NOT NULL,
    "Empresa" VARCHAR(100) NOT NULL,
    "Endereco" VARCHAR(200),
    "Num" VARCHAR(10),
    "Cidade" VARCHAR(100),
    "Bairro" VARCHAR(100),
    "Cep" VARCHAR(20),
    "UF" VARCHAR(10),
    "CNPJ" VARCHAR(18),
    "Inscricao_Estadual" VARCHAR(20),
    "Contato" VARCHAR(50),
    "Fone_1" VARCHAR(15),
    "Fone_2" VARCHAR(15),
    "Celular" VARCHAR(15),
    "Email" VARCHAR(50),
    "Empresa_certificado" VARCHAR(10),
    "Empresa_vencecert" VARCHAR(10),

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("Codigo")
);

-- CreateTable
CREATE TABLE "funcao" (
    "Controle" INTEGER NOT NULL,
    "Funcao" VARCHAR(15),
    "Descricao" VARCHAR(50),

    CONSTRAINT "funcao_pkey" PRIMARY KEY ("Controle")
);

-- CreateTable
CREATE TABLE "lpe" (
    "Controle" SERIAL NOT NULL,
    "Companhia_Agente" VARCHAR(30),
    "Embarcacao" VARCHAR(20),
    "Porto_de_chegada_e_partida" VARCHAR(500),
    "Porto_de_procedencia" VARCHAR(500),
    "Data_emissao" VARCHAR(10),
    "Lpe_obs1" VARCHAR(300),
    "Comandante" VARCHAR(300),

    CONSTRAINT "lpe_pkey" PRIMARY KEY ("Controle")
);

-- CreateTable
CREATE TABLE "lpecomboio" (
    "Controle" SERIAL NOT NULL,
    "Lista" INTEGER,
    "Embarcacao" VARCHAR(20),

    CONSTRAINT "lpecomboio_pkey" PRIMARY KEY ("Controle")
);

-- CreateTable
CREATE TABLE "lped" (
    "Controle" SERIAL NOT NULL,
    "Lista" INTEGER,
    "Documento" VARCHAR(25),
    "Identificacao" VARCHAR(15),

    CONSTRAINT "lped_pkey" PRIMARY KEY ("Controle")
);

-- CreateTable
CREATE TABLE "navegacao" (
    "Codigo_da_area_de_navegacao" VARCHAR(10) NOT NULL,
    "Descricao" VARCHAR(30),

    CONSTRAINT "navegacao_pkey" PRIMARY KEY ("Codigo_da_area_de_navegacao")
);

-- CreateTable
CREATE TABLE "pdespacho" (
    "Despacho_embarcacao" VARCHAR(20),
    "Data_do_despacho" VARCHAR(15),
    "Despacho" VARCHAR(10),
    "Despacho_como_esperado" VARCHAR(10),
    "Revalidacao" VARCHAR(10),
    "VHF_COM_DSC" VARCHAR(10),
    "VHF_SEM_DSC" VARCHAR(10),
    "Transponder_9GHz" VARCHAR(10),
    "Frequencia" VARCHAR(50),
    "Despacho_comandante" VARCHAR(100),
    "Despacho_obs" VARCHAR(2000),
    "Porto_de_Estadia" VARCHAR(100),
    "Certificado_ou_documento_temporario1" VARCHAR(10),
    "Certificado_ou_documento_temporario2" VARCHAR(10),
    "Informacao_sobre_vencimento_do_certificado_ou_documento" VARCHAR(300),
    "Id" SERIAL NOT NULL,

    CONSTRAINT "pdespacho_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "pessoal" (
    "Controle" INTEGER,
    "Documento" VARCHAR(25) NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,
    "Funcao" VARCHAR(15),
    "Data_de_nascimento" VARCHAR(10),
    "Nacionalidade" INTEGER,
    "Vencimento_CIR" VARCHAR(10),
    "RG" VARCHAR(50),

    CONSTRAINT "pessoal_pkey" PRIMARY KEY ("Documento")
);

-- CreateTable
CREATE TABLE "propulsao" (
    "Id_propulsao" SERIAL NOT NULL,
    "Descricao" VARCHAR(45),

    CONSTRAINT "propulsao_pkey" PRIMARY KEY ("Id_propulsao")
);

-- CreateTable
CREATE TABLE "user" (
    "Id" SERIAL NOT NULL,
    "Username" VARCHAR(40) NOT NULL,
    "Password" VARCHAR(50) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "embarcacao_Inscricao_key" ON "embarcacao"("Inscricao");

-- CreateIndex
CREATE INDEX "Atividade_idx_embarcacao" ON "embarcacao"("Atividade");

-- CreateIndex
CREATE INDEX "Empresa_idx_embarcacao" ON "embarcacao"("Empresa");

-- CreateIndex
CREATE INDEX "Navegacao_idx_embarcacao" ON "embarcacao"("Navegacao");

-- CreateIndex
CREATE INDEX "Propulsao_idx_embarcacao" ON "embarcacao"("Id_propulsao");

-- CreateIndex
CREATE UNIQUE INDEX "funcao_Funcao_key" ON "funcao"("Funcao");

-- CreateIndex
CREATE INDEX "Funcao_idx_funcao" ON "funcao"("Funcao");

-- CreateIndex
CREATE INDEX "Embarcacao_idx_lpe" ON "lpe"("Embarcacao");

-- CreateIndex
CREATE INDEX "Embarcacao_idx_lpecomboio" ON "lpecomboio"("Embarcacao");

-- CreateIndex
CREATE INDEX "Lista_idx_lpecomboio" ON "lpecomboio"("Lista");

-- CreateIndex
CREATE INDEX "Documento_idx_lped" ON "lped"("Documento");

-- CreateIndex
CREATE INDEX "LPE_idx_lped" ON "lped"("Lista");

-- CreateIndex
CREATE INDEX "Com_idx_pdespacho" ON "pdespacho"("Despacho_comandante");

-- CreateIndex
CREATE INDEX "Embarcacao_idx_pdespacho" ON "pdespacho"("Despacho_embarcacao");

-- CreateIndex
CREATE UNIQUE INDEX "pessoal_Nome_key" ON "pessoal"("Nome");

-- CreateIndex
CREATE INDEX "Com_idx_pessoal" ON "pessoal"("Nome");

-- CreateIndex
CREATE INDEX "Funcao_idx_pessoal" ON "pessoal"("Funcao");

-- CreateIndex
CREATE UNIQUE INDEX "user_Username_key" ON "user"("Username");

-- AddForeignKey
ALTER TABLE "CTS" ADD CONSTRAINT "CTS_Embarcacao_fkey" FOREIGN KEY ("Embarcacao") REFERENCES "embarcacao"("Inscricao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripulanteCTS" ADD CONSTRAINT "TripulanteCTS_CTSId_fkey" FOREIGN KEY ("CTSId") REFERENCES "CTS"("CTS_controle") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "Atividade" FOREIGN KEY ("Atividade") REFERENCES "atividade"("Tipo_de_atividade") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "Empresa" FOREIGN KEY ("Empresa") REFERENCES "empresa"("Codigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "Navegacao" FOREIGN KEY ("Navegacao") REFERENCES "navegacao"("Codigo_da_area_de_navegacao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "embarcacao" ADD CONSTRAINT "Propulsao" FOREIGN KEY ("Id_propulsao") REFERENCES "propulsao"("Id_propulsao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lpe" ADD CONSTRAINT "Emb" FOREIGN KEY ("Embarcacao") REFERENCES "embarcacao"("Inscricao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lpecomboio" ADD CONSTRAINT "Embarc" FOREIGN KEY ("Embarcacao") REFERENCES "embarcacao"("Inscricao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lpecomboio" ADD CONSTRAINT "LPE" FOREIGN KEY ("Lista") REFERENCES "lpe"("Controle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lped" ADD CONSTRAINT "Documento" FOREIGN KEY ("Documento") REFERENCES "pessoal"("Documento") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lped" ADD CONSTRAINT "LPE" FOREIGN KEY ("Lista") REFERENCES "lpe"("Controle") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pdespacho" ADD CONSTRAINT "Com" FOREIGN KEY ("Despacho_comandante") REFERENCES "pessoal"("Nome") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pdespacho" ADD CONSTRAINT "Embarcacao" FOREIGN KEY ("Despacho_embarcacao") REFERENCES "embarcacao"("Inscricao") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pessoal" ADD CONSTRAINT "Funca" FOREIGN KEY ("Funcao") REFERENCES "funcao"("Funcao") ON DELETE NO ACTION ON UPDATE NO ACTION;
