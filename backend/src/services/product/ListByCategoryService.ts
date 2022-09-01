import prismaClient from "../../prisma";

interface listCategoryRequest{
    category_id: string
}

class ListByCategoryService{
    async execute({category_id}:listCategoryRequest){
        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }
        })

        return findByCategory;
    }
}

export {ListByCategoryService}