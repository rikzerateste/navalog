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
      const { pedido } = req.query; // Obtemos o 'pedido' da query string

      if (!pedido || typeof pedido !== "string") {
        return res.status(400).json({ error: "ID do pedido é necessário" });
      }

      const despacho = await prisma.pdespacho.findUnique({
        where: { Id: parseInt(pedido, 10) }, // Usamos parseInt para garantir que seja um número
        include: {
          pessoal: true,
          embarcacao: {
            include: {
              empresa: true,
              lpe: {
                include: {
                  lped: {
                    include: {
                      pessoal: true
                    }
                  },
                  lpecomboio: {
                    include: {
                      embarcacao: true
                    }
                  }
                },
              },
            },
          },
        },
      });

      if (!despacho) {
        return res.status(404).json({ error: "Despacho não encontrado" });
      }

      // Separar a data para formatar no relatorio
      const dataSeparada = separarData(despacho.Data_do_despacho);

      res.status(200).json({...despacho, Lista_passageiros: despacho.embarcacao?.lpe[0], Dia: dataSeparada.Dia, Mes: dataSeparada.Mes, Ano: dataSeparada.Ano});
    } catch (error) {
      console.error("Erro ao buscar o despacho:", error);
      res.status(500).json({ error: "Erro ao buscar o despacho" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
};

export default handler;
