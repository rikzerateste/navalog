import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authenticate from '../../v1/auth/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'DELETE') {
        try {
            const { CTS_controle } = req.body;

            // Primeiro, deletar os tripulantes relacionados
            const deletedCtsTripulantes = await prisma.tripulanteCTS.deleteMany({
                where: { CTSId: Number(CTS_controle) }
            });

            // Depois, deletar o CTS
            const deletedCts = await prisma.cTS.delete({
                where: { CTS_controle: Number(CTS_controle) }
            });

            res.status(200).json({ deletedCts, deletedCtsTripulantes });
        } catch (error) {
            console.error("Erro ao deletar o CTS e os tripulantes", error);
            res.status(500).json({ error: "Erro ao deletar o CTS e os tripulantes" });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
};

export default authenticate(handler);
