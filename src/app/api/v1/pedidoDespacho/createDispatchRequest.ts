import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const data = req.body;

        try {
            const embarcacaoExistente = await prisma.embarcacao.findUnique({
                where: {Inscricao: data.Despacho_embarcacao}
            });

            const tripulanteExistente = await prisma.pessoal.findUnique({
                where: {Nome: data.Despacho_comandante}
            });

            if(!embarcacaoExistente || !tripulanteExistente) {
                return res.status(400).json({error: 'Embarcação ou tripulante inexistente.'});
            }

            const pedidoDespacho = await prisma.pdespacho.create({ data });
            res.status(201).json(pedidoDespacho);

        } catch(error) {
            console.error("Erro ao criar pedido de despacho:", error);
            res.status(500).json({error: "Falha ao criar pedido de despacho."})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}

export default handler;
