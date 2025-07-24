import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'DELETE') {
        const { inscricao } = req.body;

        try {
            const deletedVessel = await prisma.embarcacao.delete({
                where: {
                    Inscricao: inscricao
                }
            });

            res.status(200).json(deletedVessel);
        } catch(error) {
            res.status(500).json({ error: 'Erro ao deletar a Embarcação.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} not allowed.`);
    }
}

export default handler;
