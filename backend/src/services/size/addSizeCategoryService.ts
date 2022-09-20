import prismaClient from "../../prisma";

interface SizeRequest {
    name: string;
    category_id: string
}

class AddSizeCategoryService {
    async execute({ name, category_id }: SizeRequest) {

        const verificaTam = await prismaClient.size.findFirst({
            where: {
                name: name,
                category_id: category_id
            }
        })

        if (verificaTam) {
            throw new Error("Este tamanho já está cadastrado.")
        } else {

            const size = await prismaClient.size.create({
                data: {
                    name: name,
                    category_id: category_id
                }
            })
            return size;
        }
    }
}

export { AddSizeCategoryService }