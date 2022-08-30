import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

//TS
interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}:UserRequest){

   //verifica se é um email valido
   if(!email){
        throw new Error("Email inválido");
   }

   //verificando se já existe esse email cadastrado
   const emailUserExist = await prismaClient.user.findFirst({
        where:{
            email: email//se o email do banco for igual ao passado, mostra um erro
        }
   })

   if(emailUserExist){
        throw new Error("Email já existente na base de dados...");
   }

   //criptografando senha
   const hashPassword = await hash(password, 8)

   const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password: hashPassword
        },
        select:{
            id: true,
            name: true,
            email: true
        }

   })

    return user;
    }
}
export {CreateUserService}