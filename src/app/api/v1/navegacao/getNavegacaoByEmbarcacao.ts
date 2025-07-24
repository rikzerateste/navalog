import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextRequest) => {
    if(req.method === 'GET') {

        const inscricao = req.nextUrl.searchParams.get("inscricao");

        try {
            const embarcacao = await prisma.embarcacao.findUnique({
                where: {
                    Inscricao: inscricao as string
                },
                include: { navegacao: true }
            });

            if(!embarcacao) {
                return NextResponse.json({error: "Embarcação não encontrada."}, {status: 404});
            }

            return NextResponse.json(embarcacao.navegacao, {status: 200});
        } catch(error) {
            return NextResponse.json({ error: "Erro ao buscar embarcação." }, {status: 500});
        }
    } else {
        return NextResponse.json({ message: "Método não permitido" }, {status: 405});
    }
}

export default handler;
