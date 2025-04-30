import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'PUT') {
        try {
            const { Controle, Lista, embarcacao } = req.body;

            const lpecomboio = await prisma.lpecomboio.update({
                where: { Controle: Controle },
                data: {
                    Lista,
                    embarcacao: {
                        update: {
                            Empresa: embarcacao.Empresa,
                            Inscricao: embarcacao.Inscricao,
                            Embarcacao: embarcacao.Embarcacao,
                            Arqueacao_Bruta: embarcacao.Arqueacao_Bruta,
                            Registro_Tribunal_Maritimo: embarcacao.Registro_Tribunal_Maritimo,
                            Seguro: embarcacao.Seguro,
                            Tonelagem_porte_bruto: embarcacao.Tonelagem_porte_bruto,
                            Tonelagem_porte_liquido: embarcacao.Tonelagem_porte_liquido,
                            Observacao: embarcacao.Observacao,
                            Navegacao: embarcacao.Navegacao,
                            Id_propulsao: embarcacao.Id_propulsao,
                            Atividade: embarcacao.Atividade,
                            Comprimento_Total: embarcacao.Comprimento_Total,
                        },
                    },
                },
            });

            res.status(200).json(lpecomboio);
        } catch (error) {
            console.error("Erro ao atualizar comboio", error);
            res.status(500).json({ error: "Erro ao atualizar comboio" });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
