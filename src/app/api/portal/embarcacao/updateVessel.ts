import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const { Inscricao, Empresa, Atividade, Navegacao, Id_propulsao, ...data } = req.body;

            // Verifique se os dados relacionados existem antes de atualizar
            const existingEmbarcacao = await prisma.embarcacao.findUnique({
                where: { Inscricao: Inscricao }
            });

            if (!existingEmbarcacao) {
                return res.status(404).json({ error: "Embarcação não encontrada." });
            }

            // Atualize a embarcação, incluindo as relações se fornecidas
            const embarcacao = await prisma.embarcacao.update({
                where: { Inscricao: Inscricao },
                data: {
                    ...data,
                    empresa: Empresa ? { connect: { Codigo: Empresa } } : undefined,
                    atividade: Atividade ? { connect: { Tipo_de_atividade: Atividade } } : undefined,
                    navegacao: Navegacao ? { connect: { Codigo_da_area_de_navegacao: Navegacao } } : undefined,
                    propulsao: Id_propulsao ? { connect: { Id_propulsao: Id_propulsao } } : undefined
                }
            });

            res.status(200).json(embarcacao);
        } catch (error) {
            console.error("Erro ao atualizar embarcação.", error);
            res.status(500).json({ error: "Erro ao atualizar embarcação." });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default authenticate(handler);
