import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      try {
        const { empresaId } = req.query; // Assuming the ID is passed as 'id' in the query string
        const empresa = await prisma.empresa.findUnique({
          where: { Codigo: Number(empresaId) }, // Replace 'id' with the actual field name in your schema
        });
  
        if (!empresa) {
          console.log(res)
          res.status(404).json({ message: 'Empresa não encontrada.' });
          return;
        }
  
        res.status(200).json(empresa);
      } catch (error) {
        console.error('Erro ao buscar a empresa:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

export default handler;