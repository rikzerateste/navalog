import { Empresa } from "@/services/empresas";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const empresas = await prisma.empresa.findMany();
	return NextResponse.json(empresas);
}

export async function POST(req: NextRequest) {
	const data = await req.json() as Empresa;

	const empresa = await prisma.empresa.create({ data });

	return NextResponse.json(empresa);
}

// export async function PUT(req: NextRequest, res: NextResponse) {
// 	const empresa = await prisma.empresa.update({
// 		where: { Codigo: req.body.Codigo },
// 		data: req.body,
// 	});
// 	return NextResponse.json(empresa);
// }

// export async function DELETE(req: NextRequest, res: NextResponse) {
// 	const empresa = await prisma.empresa.delete({
// 		where: { Codigo: req.body.Codigo },
// 	});
// 	return NextResponse.json(empresa);
// }
