import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        const { Controle } = req.body;

        try {
            await prisma.$transaction([
                prisma.lped.deleteMany({
                    where: {
                        lpe: {
                            Controle: Number(Controle)
                        }
                    }
                }),
                prisma.lpecomboio.deleteMany({
                    where: {
                        Lista: Number(Controle)
                    }
                }),
                prisma.lpe.delete({
                    where: {
                        Controle: Number(Controle)
                    }
                })
            ]);

            res.status(200).json({ message: 'Lista de passageiros deletada com sucesso.' });
        } catch (error) {
            console.error("Erro ao deletar lista de passageiros:", error);
            res.status(500).json({ error: "Erro ao deletar lista de passageiros." });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} not allowed.`);
    }
}

export default handler;
