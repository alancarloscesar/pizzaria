import prismaClient from "../../prisma";

interface orderAccountRequest {
    valor_conta: string;
    conta_comissao: string;
    valor_comissao: string;
    garcom: string;
    order_id: string;
    user_id: string;
}

class OrderAccountService {
    async execute({ valor_conta, conta_comissao, valor_comissao, garcom, order_id, user_id }: orderAccountRequest) {
        const order = await prismaClient.orderAccount.create({
            data: {
                valor_conta: valor_conta,
                conta_comissao: conta_comissao,
                valor_comissao: valor_comissao,
                garcom: garcom,
                order_id: order_id,
                user_id: user_id
            }
        })
        return order;
    }
}
export { OrderAccountService }