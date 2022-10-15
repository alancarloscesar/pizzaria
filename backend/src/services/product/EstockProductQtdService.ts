import prismaClient from "../../prisma";

interface estoqueRequest {
    price: string;
    name: string;
    tamanho: string;
}

class EstockProductQtdService {
    async execute({ name, tamanho, price }: estoqueRequest) {

        const estock = await prismaClient.product.updateMany({
            where: {
                estoque: "false",
                name: name,
                tamanho: tamanho
            },
            data: {
                price: price
            }
        })
        return estock
    }
}

export { EstockProductQtdService }