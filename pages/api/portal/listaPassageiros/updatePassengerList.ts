import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const { Controle, ...data } = req.body;

            const listaPassageiro = await prisma.lpe.update({
                where: { Controle: Controle },
                data: {
                    Companhia_Agente: data.Companhia_Agente,
                    Porto_de_chegada_e_partida: data.Porto_de_chegada_e_partida,
                    Porto_de_procedencia: data.Porto_de_procedencia,
                    Data_emissao: data.Data_emissao,
                    Lpe_obs1: data.Lpe_obs1,
                    Comandante: data.Comandante,
                }
            });            

            res.status(200).json(listaPassageiro);
        } catch (error) {
            console.error("Erro ao atualizar lista de passageiros:", error);
            res.status(500).json({ error: "Erro ao atualizar lista de passageiros." });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
