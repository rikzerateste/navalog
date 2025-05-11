import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;

    // Verificar se as entidades relacionadas existem
    try {
      const propulsaoExistente = await prisma.propulsao.findUnique({
        where: { Id_propulsao: data.Id_propulsao }
      });
      const navegacaoExistente = await prisma.navegacao.findUnique({
        where: { Codigo_da_area_de_navegacao: data.Navegacao }
      });
      const atividadeExistente = await prisma.atividade.findUnique({
        where: { Tipo_de_atividade: data.Atividade }
      });
      const empresaExistente = await prisma.empresa.findUnique({
        where: { Codigo: data.Empresa }
      });

      if (!propulsaoExistente || !navegacaoExistente || !atividadeExistente || !empresaExistente) {
        return res.status(400).json({ error: 'Uma ou mais referências não existem ou são inválidas.' });
      }

      // Se todas as verificações passarem, criar a embarcação
      const embarcacao = await prisma.embarcacao.create({ data });
      res.status(201).json(embarcacao);
    } catch (error) {
      console.error('Erro ao criar embarcação:', error);
      res.status(500).json({ error: 'Falha ao criar a embarcação' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};

export default authenticate(handler);
