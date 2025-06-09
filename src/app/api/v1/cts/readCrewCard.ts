import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authenticate from '../../v1/auth/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {
        try {
            const cts = await prisma.cTS.findMany(
                {
                    include: {
                        tripulanteCTS: true,
                        embarcacao: true
                    }
                }
            );

            res.status(200).json(cts);
        } catch (error) {
            console.error("Erro ao buscar os CTS", error);
            res.status(400).json({error: "Erro ao buscar os CTS"});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}

export default authenticate(handler);
