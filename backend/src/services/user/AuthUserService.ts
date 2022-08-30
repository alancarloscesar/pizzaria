import prismaClient from '../../prisma'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({email, password}:AuthRequest){

        //verifica se o email existe
        const emailExist = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!emailExist){//se o email passado não bater com o do banco
            throw new Error("Email/Password não existe na base de dados")
        }
        
        const passwordMatch = await compare(password, emailExist.password)//comparando a senha
        
        if(!passwordMatch){
            throw new Error("Email/Password não existe na base de dados")
        }

        //gerando token
        const token = sign(
            {
                name: emailExist.name,
                email: emailExist.email
            },
            process.env.JWT_SECRET,//dentro do arquivo env, criamo um hash md5, strict: false no tsconfig.json
            {
                subject: emailExist.id,
                expiresIn:'30d'
            }
        )

        return {
            id: emailExist.id,
            name: emailExist.name,
            email: emailExist.email,
            token: token
        }
    }
}

export {AuthUserService}