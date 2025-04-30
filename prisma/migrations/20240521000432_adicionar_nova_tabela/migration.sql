-- CreateTable
CREATE TABLE "Empresa" (
    "Codigo" SERIAL NOT NULL,
    "Empresa" TEXT NOT NULL,
    "Endereco" TEXT,
    "Num" TEXT,
    "Cidade" TEXT,
    "Bairro" TEXT,
    "Cep" TEXT,
    "UF" TEXT,
    "CNPJ" TEXT,
    "Inscricao_Estadual" TEXT,
    "Contato" TEXT,
    "Fone_1" TEXT,
    "Fone_2" TEXT,
    "Celular" TEXT,
    "Email" TEXT,
    "Empresa_certificado" TEXT,
    "Empresa_vencecert" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("Codigo")
);
