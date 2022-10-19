import prismaClient from "../../prisma";

interface ListRequest {
    order_id: string;
    product_id: string;
}

class ListItemService {
    async execute({ order_id, product_id }: ListRequest) {
        const list = await prismaClient.item.findMany({
            where: {
                order_id: order_id,
                product_id: product_id
            }
        })
        return list;
    }
}

export { ListItemService }