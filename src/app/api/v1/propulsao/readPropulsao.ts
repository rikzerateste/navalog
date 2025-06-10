import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import authenticate from '../../v1/auth/authenticate';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const propulsao = await prisma.propulsao.findMany();
      res.status(200).json(propulsao);
      console.log("APII" + propulsao)
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler);
