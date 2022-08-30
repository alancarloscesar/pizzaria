import { Router } from "express";

import multer from "multer";
import uploadConfig from './config/multer'

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//---- ROTAS USER -----
router.post('/users',new CreateUserController().handle)//rota criar user
router.post('/session',new AuthUserController().handle)//rota fazer login
router.get('/me',isAuthenticated ,new DetailUserController().handle)//rota para detalhes de usuario

//------ ROTAS CATEGORY ------
router.post('/category', isAuthenticated, new CreateCategoryController().handle)//rota para criar categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle)//rota para listar categorias

//-------ROTAS PRODUTOS------
router.post('/product',isAuthenticated,upload.single("file"), new CreateProductController().handle)//rota para criar produto

export {router}