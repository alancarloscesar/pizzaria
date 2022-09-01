import { Router } from "express";

import multer from "multer";
import uploadConfig from './config/multer'

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

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
router.get('/product/category', isAuthenticated, new ListByCategoryController().handle)//rota para filtrar produto por categoria

//-------ROTAS PEDIDO - ORDER------
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle)

export {router}