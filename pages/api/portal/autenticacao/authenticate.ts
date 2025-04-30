import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

const authenticate = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    try {
      if (!secret) {
        res.status(500).json({ error: 'Chave secreta não definida' });
        console.error("SECRET_KEY não definida.");
        return;
      }

      jwt.verify(token, secret);
      return handler(req, res);
      
    } catch (error) {
      console.error('Invalid token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default authenticate;
