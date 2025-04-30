import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
        if(req.method === 'GET') {

            try {
                const listaPassageiros = await prisma.lpe.findMany({
                    include: {
                        embarcacao: true,
                        lpecomboio: {
                            select: {
                                Embarcacao: true,
                                embarcacao: true,
                                Controle: true,
                                Lista: true
                            }
                        },
                        lped: {
                            select: {
                                Documento: true,
                                Controle: true,
                                Lista: true,
                                Identificacao: true,
                                pessoal: true
                            }
                        }
                    }
                });
                res.status(200).json(listaPassageiros);
            } catch(error) {
                console.error("Erro ao buscar as listas de passageiros", error);
                res.status(500).json({ error});
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}

export default handler;