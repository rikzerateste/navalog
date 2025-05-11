import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const pedidosDeDespacho = await prisma.pdespacho.findMany(
        {
          include:{
            embarcacao: true
          }
        }
      );
      res.status(200).json(pedidosDeDespacho);
    } catch (error) {
      console.error("Erro ao ler os pedidos de despacho.", error);
      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(handler);
