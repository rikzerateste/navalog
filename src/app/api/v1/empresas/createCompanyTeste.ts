import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
// import authenticate from "../../auth/authenticate";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const data = req.body;
        console.log('Dados recebidos no backend:', data);

        try {
            const empresa = await prisma.empresa.create({ data });
            res.status(201).json(empresa);
        } catch (error) {
            console.error('Erro ao criar empresa:', error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Falha ao criar a empresa' });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}

export default handler;
