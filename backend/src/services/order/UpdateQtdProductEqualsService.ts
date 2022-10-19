import prismaClient from "../../prisma";

interface UpdateRequest {
    order_id: string;
    product_id: string;
    amount: number;
    price: string;
}

class UpdateQtdProductEqualsService {
    async execute({ order_id, product_id, amount, price }: UpdateRequest) {


        const updated = await prismaClient.item.updateMany({
            where: {
                order_id: order_id,
                product_id: product_id
            },
            data: {
                amount: Number(amount),
                price: price
            }
        })
        return updated;
    }

}

export { UpdateQtdProductEqualsService }