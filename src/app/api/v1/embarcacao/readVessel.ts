import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {
        try {
            const embarcacoes = await prisma.embarcacao.findMany({
                include: {
                    empresa: true
                }
            });
            res.status(200).json(embarcacoes);
        } catch(error) {
            res.status(500).json({ error });
        }
    } else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
