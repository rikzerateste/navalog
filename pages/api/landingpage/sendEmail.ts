import { SMTPClient } from 'emailjs';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {messageBody} = req.body;
    const {emailBody} = req.body;
    const {nameBody} = req.body;
    
    
    const client = new SMTPClient({
        user: process.env.EMAIL,
        password: process.env.PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });

    try {
        const message = await client.sendAsync({
            text: messageBody,
            from: 'wsdespachantefluvial@gmail.com',
            to: 'wsdespachantefluvial@gmail.com',
            subject: 'Olá! Me chamo ' +nameBody+ ', estou entrando em contato através do seu site!',
        });
        console.log(message);
    } catch (err) {
        console.error(err);
    }

    res.status(200).json({ message: "Email enviado"});
}