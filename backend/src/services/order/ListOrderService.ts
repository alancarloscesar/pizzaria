import prismaClient from "../../prisma";

class ListOrderService{
    async execute(){
        const list = await prismaClient.order.findMany({
            where:{//list(findMany) todas as ordens onde o draft && status sejam falsos
                draft: false,
                status: false
            },
            orderBy:{//ordene em ordem decrescente
                created_at: 'desc'
            }
        })
        return list;
    }
}

export {ListOrderService}