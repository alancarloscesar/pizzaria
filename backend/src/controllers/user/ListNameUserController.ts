import { Request, Response } from "express";

import { ListNameUser } from "../../services/user/ListNameUser";

class ListNameUserController {
    async handle(req: Request, res: Response) {

        const list = new ListNameUser();

        const listUser = await list.execute();

        return res.json(listUser)
    }
}

export { ListNameUserController }