import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { pedido } = req.body;

    try {
      const deletedPedidoDespacho= await prisma.pdespacho.delete({
        where: {
          Id: Number(pedido),
        },
      });

      res.status(200).json(deletedPedidoDespacho);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o pedido de despacho' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
