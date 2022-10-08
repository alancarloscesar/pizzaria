import prismaClient from "../../prisma";

interface List {
    order_id: string
    table: number
}

class ListOrderForIdService {
    async execute({ order_id, table }: List) {
        const list = await prismaClient.order.findFirst({
            where: {//list(findMany) todas as ordens onde o draft && status sejam falsos
                id: order_id,
                table: table,
                draft: false
            },
            orderBy: {//ordene em ordem decrescente
                created_at: 'desc'
            }
        })
        return list;
    }
}

export { ListOrderForIdService }