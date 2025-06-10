import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function POST(req: NextRequest, res: NextResponse) {
	const { username, password } = await req.json();

  if (!secret) {
    console.error("SECRET_KEY não definida.");
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }

	const userDb = await prisma.user.findUnique({
		where: { Username: username }
	});

	if (!userDb || !(await bcrypt.compare(password, userDb.Password))) {
		return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
	}

	const token = jwt.sign({ username }, secret, { expiresIn: '5h' });

	await prisma.$disconnect();
	return NextResponse.json({ token }, { status: 200 });
};
