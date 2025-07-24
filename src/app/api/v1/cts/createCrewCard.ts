import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { Embarcacao, tripulanteCTS, ...restData } = req.body;

    if (!Embarcacao) {
      return res.status(400).json({ error: "Inscrição é obrigatória" });
    }

    try {
      console.log("Received data:", req.body); // Log the received data

      const embarcacaoExistente = await prisma.embarcacao.findUnique({
        where: { Inscricao: Embarcacao },
      });

      if (!embarcacaoExistente) {
        return res.status(400).json({ error: "Embarcação não encontrada" });
      }

      const cts = await prisma.cTS.create({
        data: {
          ...restData,
          Embarcacao,
          tripulanteCTS: {
            create: tripulanteCTS.map((tripulante: any) => ({
              Categoria: tripulante.Categoria,
              Nivel: tripulante.Nivel,
              Quantidade: tripulante.Quantidade,
              Tipo_de_Tripulante: tripulante.Tipo_de_Tripulante
            })),
          },
        },
      });

      res.status(200).json(cts);
    } catch (error) {
      console.error("Erro ao criar o CTS:", error);
      res.status(500).json({ error: "Erro ao criar o CTS" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};

export default handler;
