import prismaClient from "../../prisma";

interface List {
    table: number
}

class ListOrderForTableService {
    async execute({ table }: List) {
        const list = await prismaClient.order.findFirst({
            where: {//list(findMany) todas as ordens onde o draft && status sejam falsos
                table: table,
                draft: false
            }
        })
        return list;
    }
}

export { ListOrderForTableService }