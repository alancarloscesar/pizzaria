import prismaClient from "../../prisma";

interface categoryRequest{
    name: string
}

class CreateCategoryService{
    async execute({name}:categoryRequest){

        if(name === ''){
            throw new Error("O campo nome não pode ficar vazio");
        }

        const verificaName = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        })

        if(verificaName){//se quiser duplicar o nome da categoria não pode deixar
            throw new Error("Essa categoria já está inserida na base de dados");

        }else{
            const category = await prismaClient.category.create({
                data:{
                    name: name
                },
                select:{
                    id: true,
                    name: true
                }
            })
            
            return category;
        }
        }
    }

export {CreateCategoryService}