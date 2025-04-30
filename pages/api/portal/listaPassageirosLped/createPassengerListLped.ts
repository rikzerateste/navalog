import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      // Verificar se o passageiro existe
      const passageiroExistente = await prisma.pessoal.findUnique({
        where: { Documento: data.pessoal.Documento }
      });

      // Verificar se a lista de passageiros existe
      const listaPassageiroExistente = await prisma.lpe.findUnique({
        where: { Controle: data.Lista }
      });

      if (!passageiroExistente || !listaPassageiroExistente) {
        return res.status(400).json({ error: "Lista de passageiros ou tripulante inexistente." });
      }

      // Criar a lista de passageiros lped com os relacionamentos usando 'connect'
      const listaPssageirosLped = await prisma.lped.create({
        data: {
          Identificacao: data.Identificacao,
          pessoal: {
            connect: {
              Documento: data.pessoal.Documento
            }
          },
          lpe: {
            connect: {
              Controle: data.Lista
            }
          }
        }
      });

      res.status(200).json(listaPssageirosLped);
    } catch (error) {
      console.error("Erro ao criar lista de passageiros lped:", error);
      res.status(500).json({ error: "Falha ao criar lista de passageiros lped." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

export default handler;
