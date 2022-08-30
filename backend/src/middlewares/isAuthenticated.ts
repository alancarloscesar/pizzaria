import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken'

interface Payload{
    sub: string//para pegar o id - mesma coisa
}

export function isAuthenticated(req:Request, res:Response, next:NextFunction){
    
    //RECEBER O TOKEN
    const authToken = req.headers.authorization;

    if(!authToken){
        //se nao tiver um token
        return res.status(401).end();//barra a requisição
    }

    //SE TIVER TOKEN
    const [,token] = authToken.split(" ")//retira aspas e palavra do token e deixa somente a numeração e letras

    try {
        //validar token
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        
        req.user_id = sub;//criando variavel para pegar o id, devemo tipar

    } catch (error) {
        return res.status(401).end();//barra a req
    }


    return next();//para deixar proceguir na requisição, saindo o loop infirito do midd
}