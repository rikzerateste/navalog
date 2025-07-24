// pages/api/tripulanteCTS/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { Tipo_de_Tripulante, Categoria, Nivel, Quantidade, CTSId } = req.body;

    try {
      // Validate if CTS exists
      const ctsExistente = await prisma.cTS.findUnique({
        where: { CTS_controle: CTSId },
      });

      if (!ctsExistente) {
        return res.status(400).json({ error: "CTS não encontrado." });
      }

      const newTripulanteCTS = await prisma.tripulanteCTS.create({
        data: {
          Tipo_de_Tripulante,
          Categoria,
          Nivel,
          Quantidade,
          CTSId,
        },
      });

      res.status(200).json(newTripulanteCTS);
    } catch (error) {
      console.error("Erro ao criar TripulanteCTS:", error);
      res.status(500).json({ error: "Falha ao criar o TripulanteCTS" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};

export default handler;
