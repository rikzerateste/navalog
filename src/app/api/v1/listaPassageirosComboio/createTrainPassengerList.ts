import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      // Verificar se a embarcação existe
      const embarcacaoExistente = await prisma.embarcacao.findUnique({
        where: { Inscricao: data.embarcacao.Inscricao }
      });

      if (!embarcacaoExistente) {
        return res.status(400).json({ error: "Embarcação não encontrada" });
      }

      // Criar o comboio com a embarcação relacionada usando 'connect'
      const comboio = await prisma.lpecomboio.create({
        data: {
          Lista: data.Lista,
          embarcacao: {
            connect: {
              Inscricao: data.embarcacao.Inscricao
            }
          },
          lpe: {
            connect: {
              Controle: data.ListaLpe
            }
          }
        }
      });

      res.status(200).json(comboio);
    } catch (error) {
      console.error("Erro ao criar comboio:", error);
      res.status(500).json({ error: "Falha ao criar comboio." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

export default handler;
