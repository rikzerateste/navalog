import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { documento } = req.body;

    try {
      const deletedTripulante = await prisma.pessoal.delete({
        where: {
          Documento: documento,
        },
      });

      res.status(200).json(deletedTripulante);
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar tripulante." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
