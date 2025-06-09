import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import authenticate from "../../v1/auth/authenticate";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {

        const { inscricao } = req.query;

        try {
            const embarcacao = await prisma.embarcacao.findUnique({
                where: {
                    Inscricao: inscricao as string
                },
                include: { navegacao: true }
            });

            if(!embarcacao) {
                return res.status(404).json({error: "Embarcação não encontrada."});
            }

            res.status(200).json(embarcacao.navegacao);
        } catch(error) {
            return res.status(500).json({ error: "Erro ao buscar embarcação." });
        }
    } else {
        return res.status(405).json({ message: "Método não permitido" });
    }
}

export default authenticate(handler);
