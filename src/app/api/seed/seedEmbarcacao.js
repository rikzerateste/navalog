import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Verificar se as relações referenciadas existem
    const empresaExistente = await prisma.empresa.findUnique({
        where: { Codigo: 9 }
    });

    const atividadeExistente = await prisma.atividade.findUnique({
        where: { Tipo_de_atividade: "CAR" }
    });

    const navegacaoExistente = await prisma.navegacao.findUnique({
        where: { Codigo_da_area_de_navegacao: "APP" }
    });

    const propulsaoExistente = await prisma.propulsao.findUnique({
        where: { Id_propulsao: 1 }
    });

    if (empresaExistente && atividadeExistente && navegacaoExistente && propulsaoExistente) {
        const embarcacao = await prisma.embarcacao.create({
            data: {
                Inscricao: "1234",
                Embarcacao: "Holandês Voador",
                Arqueacao_Bruta: "AB",
                Registro_Tribunal_Maritimo: "10",
                Seguro: "1234",
                Tonelagem_porte_bruto: "10",
                Tonelagem_porte_liquido: "5",
                Observacao: "Obs",
                Comprimento_Total: "120",
                Atividade: "CAR",
                Empresa: 9,
                Navegacao: "APP",
                Id_propulsao: 1
            }
        });

        console.log("Embarcação criada:", embarcacao);
    } else {
        console.error("Uma ou mais referências não existem:");
        if (!empresaExistente) console.error("Empresa não encontrada.");
        if (!atividadeExistente) console.error("Atividade não encontrada.");
        if (!navegacaoExistente) console.error("Navegação não encontrada.");
        if (!propulsaoExistente) console.error("Propulsão não encontrada.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
