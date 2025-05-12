import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Para comparar a senha

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	console.log('REQ -----', req.body);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, senha } = req.body as { email: string, senha: string };

	console.log('SENHA -----', senha);

  if (!SECRET_KEY) {
    console.error("SECRET_KEY não definida.");
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }

  try {
    const userDb = await prisma.user.findUnique({
      where: {
        Username: email,
      },
    });

    if (!userDb || !(await bcrypt.compare(senha, userDb.Password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
