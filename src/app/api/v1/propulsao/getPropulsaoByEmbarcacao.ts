import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   if(req.method === 'GET') {
        const {inscricao} = req.query;

        try {
            const embarcacao = await prisma.embarcacao.findUnique({
                where: {Inscricao: inscricao as string},
                include: {propulsao: true}
            });

            if(!embarcacao) {
                return res.status(404).json( { error: "Erro ao procurar embarcação" } );
            }

            res.status(200).json(embarcacao.propulsao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao procurar embarcação" });
        }
   } else {
        return res.status(405).json({ message: "Método não permitido" });
   }
}

export default handler;
