import prismaClient from "../../prisma";

interface priceRequest{
    name: string;
    tamanho: string
}

class FindPriceProductService{
    async execute({name, tamanho}: priceRequest){
        const price = await prismaClient.product.findMany({
            where:{
                name: name,
                tamanho: tamanho
            },
            select:{
                name: true,
                tamanho: true,
                price: true
            }
        })
        return price;
    }
}

export {FindPriceProductService}