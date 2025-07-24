import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { Username, Password } = await req.json();

		if (!Username || !Password) {
			return new Response(JSON.stringify({ error: "Nome de usuário e senha são obrigatórios" }), { status: 400 });
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(Password, saltRounds);

		const user = await prisma.user.create({
			data: {
				Username,
				Password: hashedPassword,
			},
		});

		return new Response(JSON.stringify({ id: user.Id, username: user.Username }), { status: 201 });
	} catch (error) {
		console.error("Falha ao cadastrar usuário:", error);
		return new Response(JSON.stringify({ error: "Falha ao cadastrar usuário" }), { status: 500 });
	}
};
