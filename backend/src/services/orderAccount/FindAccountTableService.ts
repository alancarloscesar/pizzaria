import prismaClient from "../../prisma";

interface findAccountRequest {
    order_id: string
}

class FindAccountTableService {
    async execute({ order_id }: findAccountRequest) {
        const find = await prismaClient.orderAccount.findFirst({
            where: {
                order_id: order_id
            }
        })
        return find;
    }
}

export { FindAccountTableService }