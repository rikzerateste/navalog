import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            // Acessar os parâmetros de consulta da URL
            const { Controle } = req.query;

            if (!Controle || Array.isArray(Controle)) {
                return res.status(400).json({ error: "Parâmetro 'Controle' inválido ou ausente" });
            }

            const lpeds = await prisma.lped.findMany({
                where: { Lista: parseInt(Controle, 10) },  // Converter Controle para número
                include: {
                    pessoal: true,  // Incluir as informações relacionadas na tabela 'pessoal'
                },
            });

            res.status(200).json(lpeds);
        } catch (error) {
            console.error("Erro ao buscar lped pela lista de passageiros", error);
            res.status(400).json({ error: "Erro ao buscar lped pela lista de passageiros" });
        }
    } else {
        console.log("O método utilizado não é permitido.");
        res.status(405).json({ error: "Método não permitido" });
    }
};

export default handler;
