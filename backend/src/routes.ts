import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//---- ROTAS USER -----
router.post('/users',new CreateUserController().handle)//rota criar user
router.post('/session',new AuthUserController().handle)//rota fazer login
router.get('/me',isAuthenticated ,new DetailUserController().handle)//rota para detalhes de usuario

export {router}