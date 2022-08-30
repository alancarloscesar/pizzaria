import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController{
    async handle(req:Request, res:Response){
        const detailUserService = new DetailUserService();
        const detail = await detailUserService.execute()

        return res.json(detail)
    }
}

export {DetailUserController}