import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'PUT') {
        try {
            const {Controle, ...data} = req.body;
            const lped = await prisma.lped.update({
                where: {Controle: Controle},
                data
            });

            res.status(200).json(lped);
        } catch(error) {
            console.error("Erro ao atualizar lped", error);
            res.status(500).json({error: "Erro ao atualizar lped."});
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;