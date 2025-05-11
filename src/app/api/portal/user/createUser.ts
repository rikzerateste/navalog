import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const { Username, Password } = req.body;
            
            if (!Username || !Password) {
                return res.status(400).json({ error: "Nome de usuário e senha são obrigatórios" });
            }

            // Gerar hash da senha com bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Password, saltRounds);

            // Criar o novo usuário no banco de dados com a senha encriptada
            const user = await prisma.user.create({
                data: {
                    Username,
                    Password: hashedPassword,
                },
            });

            // Retornar o usuário criado (sem expor a senha)
            res.status(201).json({ id: user.Id, username: user.Username });
        } catch (error) {
            console.error("Falha ao cadastrar usuário:", error);
            res.status(500).json({ error: "Falha ao cadastrar usuário" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
};

export default handler;
