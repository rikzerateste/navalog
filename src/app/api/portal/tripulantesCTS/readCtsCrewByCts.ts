import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { Controle } = req.query;

      if (!Controle || Array.isArray(Controle)) {
        return res
          .status(400)
          .json({ error: "Parâmetro 'Controle' inválido ou ausente" });
      }

      const tripulantes = await prisma.tripulanteCTS.findMany({
        where: { CTSId: parseInt(Controle, 10) },
      });

      res.status(200).json(tripulantes);
    } catch (error) {
        console.error("Erro ao buscar os tripulantes", error);
        res.status(400).json({error: "Erro ao buscar os tripulantes"});
    }
  } else {
    console.log(`Método ${req.method} não permitido`);
    res.status(500).json({error:"Método não permitido"});
  }
};

export default authenticate(handler);
