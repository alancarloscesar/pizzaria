import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
    price: string;
}

class AddItemService {
    async execute({ order_id, product_id, amount, price }: ItemRequest) {

        const item = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount,
                price: price
            }
        })
        return item;
    }
}

export { AddItemService }