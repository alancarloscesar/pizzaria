import { Router } from "express";


import multer from "multer";
import uploadConfig from './config/multer'

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListNameUserController } from "./controllers/user/ListNameUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { FindPriceProductController } from "./controllers/product/FindPriceProductController";
import { EstockProductQtdController } from "./controllers/product/EstockProductQtdController";
import { EstockProductQtdPriceController } from "./controllers/product/EstockProductQtdPriceController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { OrderExistentController } from "./controllers/order/OrderExistentController";
import { ListOrderForIdController } from "./controllers/order/ListOrderForIdController";
import { ListOrderForTableController } from "./controllers/order/ListOrderForTableController";

import { AddSizeCategoryController } from "./controllers/size/addSizeCategoryController";
import { ListSizeCategoryController } from "./controllers/size/ListSizeCategory";

import { OrderAccountController } from "./controllers/orderAccount/OrderAccountController";
import { FindAccountTableController } from "./controllers/orderAccount/FindAccountTableController";
import { UpdateAccountController } from "./controllers/orderAccount/UpdateAccountController";

import { ReportCommissionController } from "./controllers/report/ReportCommissionController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UpdateQtdProductEqualsController } from "./controllers/order/UpdateQtdProductEqualsController";
import { ListItemController } from "./controllers/order/ListItemController";

import { invoicingDateController } from "./controllers/invoicing/invoicingDateContrller";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//---- ROTAS USER -----
router.post('/users', new CreateUserController().handle)//rota criar user
router.post('/session', new AuthUserController().handle)//rota fazer login
router.get('/me', isAuthenticated, new DetailUserController().handle)//rota para detalhes de usuario
router.get('/user/name', isAuthenticated, new ListNameUserController().handle)

//------ ROTAS CATEGORY ------
router.post('/category', isAuthenticated, new CreateCategoryController().handle)//rota para criar categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle)//rota para listar categorias
router.get('/price/name/size', isAuthenticated, new FindPriceProductController().handle)

//-------ROTAS PRODUTOS------
router.post('/product', isAuthenticated, upload.single("file"), new CreateProductController().handle)//rota para criar produto
router.get('/product/category', isAuthenticated, new ListByCategoryController().handle)//rota para filtrar produto por categoria
router.put('/product/update', isAuthenticated, new EstockProductQtdController().handle)
router.put('/product/estock', isAuthenticated, new EstockProductQtdPriceController().handle)


//-------ROTAS PEDIDO - ORDER------
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/order', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
router.post('/order/exist', isAuthenticated, new OrderExistentController().handle)
router.get('/order/id', isAuthenticated, new ListOrderForIdController().handle)
router.get('/order/table', isAuthenticated, new ListOrderForTableController().handle)
router.put('/order/update', isAuthenticated, new UpdateQtdProductEqualsController().handle)
router.get('/item/list', isAuthenticated, new ListItemController().handle)

//-------------ROTAS PARA O TAMANHO SIZE---------
router.post('/size', isAuthenticated, new AddSizeCategoryController().handle)
router.get('/category/size', isAuthenticated, new ListSizeCategoryController().handle)

//-------------ROTAS PARA FINALIZAR A ORDER-------------
router.post('/order/account', isAuthenticated, new OrderAccountController().handle)
router.get('/order/account', isAuthenticated, new FindAccountTableController().handle)
router.put('/account', isAuthenticated, new UpdateAccountController().handle)

//-------------ROTAS PARA RELATORIO DE COMISSOES-----------
router.post('/report', isAuthenticated, new ReportCommissionController().handle)

//------------- ROTAS PARA O FATURAMENTO ---------------------
router.post('/invoicing', isAuthenticated, new invoicingDateController().handle)


export { router }