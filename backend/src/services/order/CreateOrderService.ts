import prismaClient from "../../prisma";

interface OrderRequest{
    name: string
    table: number
    user_id: string
    garcom: string
}

class CreateOrderService{
    async execute({name, table,garcom, user_id}: OrderRequest){
        const order = await prismaClient.order.create({
            data:{
                name: name,
                table: table,
                garcom: garcom,
                user_id: user_id
            }
        })
        return order;
    }
}

export {CreateOrderService}