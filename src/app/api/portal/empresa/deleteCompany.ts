import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { codigo } = req.query;

    // Verifica se codigo é um array e, se for, pega o primeiro valor
    const codigoToDelete = Array.isArray(codigo) ? codigo[0] : codigo;

    if (codigoToDelete) {
      try {
        const deletedEmpresa = await prisma.empresa.delete({
          where: {
            Codigo: parseInt(codigoToDelete, 10),
          },
        });

        res.status(200).json(deletedEmpresa);
      } catch (error) {
        console.error("Erro ao deletar a empresa", error);
        res.status(500).json({ error: 'Erro ao deletar a empresa' });
      }
    } else {
      res.status(400).json({ error: 'Código de empresa não fornecido' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler);
