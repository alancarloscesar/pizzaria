import prismaClient from "../../prisma";

interface orderAccountRequest {
    valor_conta: string;
    conta_comissao: string;
    valor_comissao: string;
    order_id: string;
   
}

class UpdateAccountService {
    async execute({ valor_conta, conta_comissao, valor_comissao, order_id }: orderAccountRequest) {
        const accountReq = await prismaClient.orderAccount.updateMany({
            where: {
                order_id: order_id
            },
            data: {
                valor_conta: valor_conta,
                valor_comissao: valor_comissao,
                conta_comissao: conta_comissao
            }
        })
        return accountReq
    }
}

export { UpdateAccountService }