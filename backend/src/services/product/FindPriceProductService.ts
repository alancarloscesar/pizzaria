import prismaClient from "../../prisma";

interface priceRequest {
    order_id: string;
}

class FindPriceProductService {
    async execute({ order_id }: priceRequest) {
        const itemPrice = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            }
        })
        return (itemPrice)
    }
}

export { FindPriceProductService }