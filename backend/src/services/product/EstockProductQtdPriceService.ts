import prismaClient from "../../prisma";

interface estoqueRequest {
    quantidade: number;
    name: string;
    tamanho: string;
    price: string;
}

class EstockProductQtdPriceService {
    async execute({ name, tamanho, quantidade, price }: estoqueRequest) {

        const productTrue = await prismaClient.product.findFirst({
            where: {
                estoque: "true"
            }
        })

        if (productTrue) {//se for true vai atualizar o price e qtd
            const estock = await prismaClient.product.updateMany({
                where: {
                    estoque: "true",
                    name: name,
                    tamanho: tamanho
                },
                data: {
                    quantidade: quantidade,
                    price: price
                }
            })
            return estock
        } else {
            const estock = await prismaClient.product.updateMany({
                where: {
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
}

export { EstockProductQtdPriceService }