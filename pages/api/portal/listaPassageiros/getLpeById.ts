import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {

        try {
            const { Controle } = req.query;
            
            if (!Controle || Array.isArray(Controle)) {
                return res.status(400).json({ error: "Parâmetro 'Controle' inválido ou ausente" });
            };

            const lpe = await prisma.lpe.findUnique({
                where: {
                    Controle: parseInt(Controle, 10)
                },
                include: {
                    embarcacao: true
                }
            })

            res.status(200).json(lpe)
        } catch(error) {
            console.error("Erro ao buscar essa lista de passageiro: ", error);
            res.status(400).json({ error: "Erro ao buscar essa lista de passageiros" });
        }

    } else {
        console.log(`Método ${req.method} não permitido`);
        res.status(500).json({ error:"Método não permitido." });
    }
}

export default handler;