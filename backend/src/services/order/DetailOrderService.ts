import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
    pertencente: string;
}

class DetailOrderService {
    async execute({ order_id, pertencente }: OrderRequest) {
        const orders = await prismaClient.item.findMany({
            where: {
                order_id: order_id,
                pertencente: pertencente
            },
            include: {
                product: true,
                order: true
            }
        })
        return orders
    }
}

export { DetailOrderService }