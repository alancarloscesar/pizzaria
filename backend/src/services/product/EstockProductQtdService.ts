import prismaClient from "../../prisma";

interface estoqueRequest {
    quantidade: number;
    name: string;
    tamanho: string;
}

class EstockProductQtdService {
    async execute({ name, tamanho, quantidade }: estoqueRequest) {

        const estock = await prismaClient.product.updateMany({
            where: {
                estoque: "true",
                name: name,
                tamanho: tamanho
            },
            data: {
                quantidade: quantidade
            }
        })
        return estock
    }
}

export { EstockProductQtdService }