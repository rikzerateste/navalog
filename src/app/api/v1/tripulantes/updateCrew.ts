import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authenticate from '../../v1/auth/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'PUT') {
        try {
            const {Documento, ...data} = req.body;
            const tripulante = await prisma.pessoal.update({
                where: { Documento: Documento },
                data
            });
            res.status(200).json(tripulante);
        } catch (error) {
            console.error('Erro ao atualizar tripulantes.', error);
            res.status(500).json({ error: 'Erro ao atualizar tripulantes.' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default authenticate(handler);
