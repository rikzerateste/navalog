import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        if(req.method === 'GET') {

            try {
                const listaComboio = await prisma.lpecomboio.findMany();
                res.status(200).json(listaComboio);
            } catch(error) {
                console.error("Erro ao buscar as listas de comboios", error);
                res.status(500).json({ error});
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}

export default handler;