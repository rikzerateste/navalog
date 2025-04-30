import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Anonymous_Pro } from "next/font/google";

const prisma = new PrismaClient();

const nomearMes = (numeroDoMes: string) => {
  switch(numeroDoMes){
    case '01':
      return "Janeiro";
    case '02':
      return "Fevereiro";
    case '03':
      return "Março";
    case '04':
      return "Abril";
    case '05':
      return "Maio";
    case '06':
      return "Junho";
    case '07':
      return "Julho";
    case '08':
      return "Agosto";
    case '09':
      return "Setembro";
    case '10':
      return "Outubro";
    case '11':
      return "Novembro";
    case '12':
      return "Dezembro";
    default:
      return "";
  }
}

const separarData = (data: string | null) => {
  if(data!=null){
    const partes = data.split('/');
    return {
      Dia: partes[0] || "",
      Mes: nomearMes(partes[1]) || "",
      Ano: partes[2] || ""
    };
  }else{
    return { Dia: "", Mes: "", Ano: "" };
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { controle } = req.query; // Obtemos o 'pedido' da query string

      if (!controle || typeof controle !== "string") {
        return res.status(400).json({ error: "ID da lista de passageiros é necessário" });
      }

      const despacho = await prisma.lpe.findUnique({
        where: { Controle: parseInt(controle, 10) }, // Usamos parseInt para garantir que seja um número
        include: {
            embarcacao: true,
            lpecomboio: {
                include: {
                    embarcacao: true
                }
            },
            lped: {
                include: {
                    pessoal: true
                }
            }
        }
    });

      if (!despacho) {
        return res.status(404).json({ error: "Lista de passageiros não encontrada" });
      }

      // Separar a data para formatar no relatorio
      const dataSeparada = separarData(despacho.Data_emissao);

      res.status(200).json({...despacho, Dia: dataSeparada.Dia, Mes: dataSeparada.Mes, Ano: dataSeparada.Ano});
    } catch (error) {
      console.error("Erro ao buscar a lista de passageiros:", error);
      res.status(500).json({ error: "Erro ao buscar a lista de passageiros" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
};

export default handler;
