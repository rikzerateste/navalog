import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import authenticate from '../autenticacao/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const { Id, embarcacao, pessoal, Despacho_comandante, Despacho_embarcacao, ...data } = req.body;

            // Verifique se o pedido de despacho existe antes de atualizar
            const existingPedidoDespacho = await prisma.pdespacho.findUnique({
                where: { Id: Number(Id) }
            });

            if (!existingPedidoDespacho) {
                return res.status(404).json({ error: "Pedido de despacho não encontrado." });
            }

            // Atualize o pedido de despacho, incluindo as relações se fornecidas
            const pedidoDespacho = await prisma.pdespacho.update({
                where: { Id: Number(Id) },
                data: {
                    ...data,
                    pessoal: Despacho_comandante ? { connect: { Nome: Despacho_comandante } } : undefined,
                    embarcacao: Despacho_embarcacao ? { connect: { Inscricao: Despacho_embarcacao } } : undefined,
                }
            });

            res.status(200).json(pedidoDespacho);
        } catch (error) {
            console.error('Erro ao atualizar o pedido de despacho:', error);
            res.status(500).json({ error: "Erro ao atualizar pedido de despacho." });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default authenticate(handler);
