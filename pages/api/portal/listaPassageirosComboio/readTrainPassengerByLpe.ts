import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {

        try {
            const { Controle } = req.query;
            
            if (!Controle || Array.isArray(Controle)) {
                return res.status(400).json({ error: "Parâmetro 'Controle' inválido ou ausente" });
            };

            const comboios = await prisma.lpecomboio.findMany({
                where: { Lista: parseInt(Controle, 10) },  // Converter Controle para número
                include: {
                    embarcacao: true,  // Incluir as informações relacionadas na tabela 'pessoal'
                },
            });

            res.status(200).json(comboios)
        } catch(error) {
            console.error("Erro ao buscar os comboios: ", error);
            res.status(400).json({ error: "Erro ao buscar os comboios" });
        }

    } else {
        console.log(`Método ${req.method} não permitido`);
        res.status(500).json({ error:"Método não permitido." });
    }
}

export default handler;