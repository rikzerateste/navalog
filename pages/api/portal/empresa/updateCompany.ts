import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const { Codigo, ...data } = req.body;
      const empresa = await prisma.empresa.update({
        where: { Codigo: Number(Codigo) },
        data,
      });
      res.status(200).json(empresa);
    } catch (error) {
      console.error('Erro ao atualizar a empresa:', error);
      res.status(500).json({ error: 'Erro ao atualizar a empresa.' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(handler);
