import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const empresasData = req.body;

        // Verifica se os dados recebidos são um array
        if (!Array.isArray(empresasData)) {
            return res.status(400).json({ error: 'Os dados enviados devem ser um array de empresas.' });
        }

        console.log('Dados recebidos no backend:', empresasData);

        try {
            const empresasCriadas = await prisma.$transaction(
                empresasData.map(empresa => prisma.empresa.create({ data: empresa }))
            );

            res.status(201).json(empresasCriadas);
        } catch (error) {
            console.error('Erro ao criar empresas:', error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Falha ao criar as empresas' });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}

export default handler;
