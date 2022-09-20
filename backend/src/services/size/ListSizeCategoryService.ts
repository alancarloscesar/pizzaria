import prismaClient from "../../prisma";

interface ListCategory {
    category_id: string;
}

class ListSizeCategoryService {
    async execute({ category_id }: ListCategory) {
        const size = await prismaClient.size.findMany({
            where: {
                category_id: category_id
            },
            select:{
                id: true,
                name: true,
                category_id: true
            }
        })
        return size;
    }
}

export { ListSizeCategoryService }