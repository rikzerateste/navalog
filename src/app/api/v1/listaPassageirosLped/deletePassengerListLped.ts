import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'DELETE') {
        const { Controle } = req.body;

        try {
            const deletedLped = await prisma.lped.delete({
                where: {
                    Controle: Controle
                }
            });

            res.status(200).json(deletedLped);
        } catch (error) {
            console.error("Erro ao deletar lped.", error);
            res.status(500).json({error: "Erro ao deletar lped."});
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} not allowed.`);
    }
}

export default handler;