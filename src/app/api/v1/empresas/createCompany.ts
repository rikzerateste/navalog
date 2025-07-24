import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';
//

const prisma = new PrismaClient();;

const cepSchema = z.string().regex(/^\d{5}-\d{3}$/, {
  message: 'CEP inválido. Deve estar no formato XXXXX-XXX',
});

const ufSchema = z.enum([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]);

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const cnpjSchema = z.string().refine((cnpj) => {
  if (!cnpjRegex.test(cnpj)) return false;

  // Remove os caracteres especiais do CNPJ
  const cleanedCNPJ = cnpj.replace(/[^\d]+/g, '');

  // Validação dos dígitos verificadores
  if (cleanedCNPJ.length !== 14) return false;

  const validateCNPJ = (cnpj: string): boolean => {
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0), 10)) return false;

    length++;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1), 10)) return false;

    return true;
  };

  return validateCNPJ(cleanedCNPJ);
}, {
  message: 'CNPJ inválido',
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailSchema = z.string().regex(emailRegex, {
  message: 'Endereço de e-mail inválido. Deve estar no formato usuario@dominio.com',
});

const empresaSchema = z.object({
  Empresa: z.string(),
  Endereco: z.string().min(2).max(200),
  Num: z.number().max(10),
  Cidade: z.string().min(2).max(100),
  Bairro:z.string().min(2).max(100),
  Cep: cepSchema,
  UF: ufSchema,
  CNPJ: cnpjSchema,
  Inscricao_Estadual: z.string().max(20),
  Contato: z.string().min(8).max(50),
  Fone_1: z.string().min(8).max(15),
  Fone_2: z.string().min(8).max(15),
  Celular: z.string().min(8).max(15),
  Email: emailSchema,
  Empresa_certificado: z.string().max(10),
  Empresa_vencecert: z.string().max(10)
});

// Codigo              Int    @id @default(autoincrement())
// Empresa             String @db.VarChar(100)
// Endereco            String @db.VarChar(200)
// Num                 String @db.VarChar(10)
// Cidade              String @db.VarChar(100)
// Bairro              String @db.VarChar(100)
// Cep                 String @db.VarChar(20)
// UF                  String @db.VarChar(10)
// CNPJ                String @db.VarChar(18)
// Inscricao_Estadual  String @db.VarChar(20)
// Contato             String @db.VarChar(50)
// Fone_1              String @db.VarChar(15)
// Fone_2              String @db.VarChar(15)
// Celular             String @db.VarChar(15)
// Email               String @db.VarChar(50)
// Empresa_certificado String @db.VarChar(10)
// Empresa_vencecert   String @db.VarChar(10)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const empresa = await prisma.empresa.create({ data });
      res.status(201).json(empresa);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create empresa' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
