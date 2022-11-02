"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //RECEBER O TOKEN
    const authToken = req.headers.authorization;
    if (!authToken) {
        //se nao tiver um token
        return res.status(401).end(); //barra a requisição
    }
    //SE TIVER TOKEN
    const [, token] = authToken.split(" "); //retira aspas e palavra do token e deixa somente a numeração e letras
    try {
        //validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = sub; //criando variavel para pegar o id, devemo tipar
    }
    catch (error) {
        return res.status(401).end(); //barra a req
    }
    return next(); //para deixar proceguir na requisição, saindo o loop infirito do midd
}
exports.isAuthenticated = isAuthenticated;
