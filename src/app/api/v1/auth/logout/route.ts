import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ message: "Logout efetuado com sucesso." });
}