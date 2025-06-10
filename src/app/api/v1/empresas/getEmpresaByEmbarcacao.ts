import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { inscricao } = req.query;

    try {
      const embarcacao = await prisma.embarcacao.findUnique({
        where: { Inscricao: inscricao as string },
        include: { empresa: true },
      });

      if (!embarcacao) {
        return res.status(404).json({ message: "Embarcação não encontrada" });
      }

      return res.status(200).json(embarcacao.empresa);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar empresa" });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
