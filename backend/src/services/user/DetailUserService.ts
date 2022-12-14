import prismaClient from "../../prisma";

class DetailUserService{
    async execute(user_id:string){

        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id//comparando ids
            },
            select:{
                id:true,
                name:true,
                email:true,
                type: true
            }
        })
        return user;
    }
}

export {DetailUserService}