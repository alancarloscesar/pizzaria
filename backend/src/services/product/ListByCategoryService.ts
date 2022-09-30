import prismaClient from "../../prisma";

interface listCategoryRequest{
    category_id: string
    tamanho: string
}

class ListByCategoryService{
    async execute({category_id, tamanho}:listCategoryRequest){
        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id,
                tamanho: tamanho
            }
        })

        return findByCategory;
    }
}

export {ListByCategoryService}