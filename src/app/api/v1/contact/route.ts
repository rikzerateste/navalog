import { SMTPClient } from 'emailjs';
import { NextRequest, NextResponse } from 'next/server';

export default async function POST(req: NextRequest, res: NextResponse) {
	const { messageBody, nameBody } = await req.json();

	const client = new SMTPClient({
		user: process.env.EMAIL,
		password: process.env.PASSWORD,
		host: 'smtp.gmail.com',
		ssl: true,
	});

	await client.sendAsync({
		text: messageBody,
		from: 'wsdespachantefluvial@gmail.com',
		to: 'wsdespachantefluvial@gmail.com',
		subject: `Olá! Me chamo ${nameBody}, estou entrando em contato através do seu site!`,
	});

	return NextResponse.json({ message: "Email enviado"});
}
