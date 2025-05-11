import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data)
    try {
      const funcaoExistente = await prisma.funcao.findUnique({
        where: { Funcao: data.Funcao },
      });

      if (!funcaoExistente) {
        return res.status(400).json({ error: "Essa função não existe." });
      }

      const tripulante = await prisma.pessoal.create({ data });
      res.status(200).json(tripulante);
    } catch (error) {
      console.error("Erro ao criar tripulante:", error);
      res.status(500).json({ error: "Falha ao criar o tripulante" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};

export default authenticate(handler);
