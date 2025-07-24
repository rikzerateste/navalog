import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const { CTS_controle, Embarcacao, Data_emissao, tripulanteCTS } = req.body;

            const ctsUpdated = await prisma.cTS.update({
                where: { CTS_controle: CTS_controle },
                data: {
                    embarcacao: {
                        connect: { Inscricao: Embarcacao }
                    },
                    Data_emissao: Data_emissao,
                    // Atualizar os tripulantes conforme necessário
                }
            });

            // Atualiza ou cria registros de TripulanteCTS
            if (tripulanteCTS && tripulanteCTS.length > 0) {
                await Promise.all(tripulanteCTS.map(async (tripulante: any) => {
                    const { id, ...tripulanteData } = tripulante;
                    if (id) {
                        // Atualiza o tripulante existente
                        await prisma.tripulanteCTS.update({
                            where: { id },
                            data: tripulanteData,
                        });
                    } else {
                        // Cria um novo tripulante
                        await prisma.tripulanteCTS.create({
                            data: {
                                ...tripulanteData,
                                CTSId: CTS_controle, // Relaciona com o CTS atualizado
                            },
                        });
                    }
                }));
            }

            res.status(200).json(ctsUpdated);
        } catch (error) {
            console.error("Erro ao atualizar CTS e tripulantes.", error);
            res.status(500).json({ error: "Erro ao atualizar CTS e tripulantes." });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
