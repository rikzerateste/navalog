import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authenticate from '../../v1/auth/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const { Id } = req.query;

      if (!Id || Array.isArray(Id)) {
        return res
          .status(400)
          .json({ error: "Parâmetro 'Id' inválido ou ausente" });
      }

      const tripulanteDeleted = await prisma.tripulanteCTS.delete({
        where: {
          id: parseInt(Id as string, 10)
        }
      });

      res.status(200).json(tripulanteDeleted);
    } catch (error) {
      console.error("Erro ao deletar o tripulante", error);
      res.status(500).json({ error: "Erro ao deletar o tripulante" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};

export default authenticate(handler);
