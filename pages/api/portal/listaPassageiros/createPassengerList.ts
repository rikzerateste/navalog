import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST") {
        const data = req.body;

        try {
            const embarcacaoExistente = await prisma.embarcacao.findUnique({
                where: { Inscricao: data.Embarcacao }
            });

            if (!embarcacaoExistente) {
                return res.status(400).json( { error: "Embarcação não encontrada." } );
            }

            // Remover o campo `Embarcacao` do data e usar a conexão Prisma
            const { Embarcacao, ...restData } = data;

            const listaPassageiros = await prisma.lpe.create({
                data: {
                    ...restData,
                    embarcacao: {
                        connect: { Inscricao: Embarcacao }
                    }
                }
            });

            res.status(200).json(listaPassageiros);
        } catch(error) {
            console.error("Erro ao criar lista de passageiros:", error);
            res.status(500).json({ error: "Falha ao criar lista de passageiros." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}

export default handler;
