"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const ListNameUserController_1 = require("./controllers/user/ListNameUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const FindPriceProductController_1 = require("./controllers/product/FindPriceProductController");
const EstockProductQtdController_1 = require("./controllers/product/EstockProductQtdController");
const EstockProductQtdPriceController_1 = require("./controllers/product/EstockProductQtdPriceController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrderController_1 = require("./controllers/order/ListOrderController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const OrderExistentController_1 = require("./controllers/order/OrderExistentController");
const ListOrderForIdController_1 = require("./controllers/order/ListOrderForIdController");
const ListOrderForTableController_1 = require("./controllers/order/ListOrderForTableController");
const addSizeCategoryController_1 = require("./controllers/size/addSizeCategoryController");
const ListSizeCategory_1 = require("./controllers/size/ListSizeCategory");
const OrderAccountController_1 = require("./controllers/orderAccount/OrderAccountController");
const FindAccountTableController_1 = require("./controllers/orderAccount/FindAccountTableController");
const UpdateAccountController_1 = require("./controllers/orderAccount/UpdateAccountController");
const ReportCommissionController_1 = require("./controllers/report/ReportCommissionController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const UpdateQtdProductEqualsController_1 = require("./controllers/order/UpdateQtdProductEqualsController");
const ListItemController_1 = require("./controllers/order/ListItemController");
const invoicingDateContrller_1 = require("./controllers/invoicing/invoicingDateContrller");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//---- ROTAS USER -----
router.post('/users', new CreateUserController_1.CreateUserController().handle); //rota criar user
router.post('/session', new AuthUserController_1.AuthUserController().handle); //rota fazer login
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle); //rota para detalhes de usuario
router.get('/user/name', isAuthenticated_1.isAuthenticated, new ListNameUserController_1.ListNameUserController().handle);
//------ ROTAS CATEGORY ------
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle); //rota para criar categoria
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle); //rota para listar categorias
router.get('/price/name/size', isAuthenticated_1.isAuthenticated, new FindPriceProductController_1.FindPriceProductController().handle);
//-------ROTAS PRODUTOS------
router.post('/product', isAuthenticated_1.isAuthenticated, upload.single("file"), new CreateProductController_1.CreateProductController().handle); //rota para criar produto
router.get('/product/category', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle); //rota para filtrar produto por categoria
router.put('/product/update', isAuthenticated_1.isAuthenticated, new EstockProductQtdController_1.EstockProductQtdController().handle);
router.put('/product/estock', isAuthenticated_1.isAuthenticated, new EstockProductQtdPriceController_1.EstockProductQtdPriceController().handle);
//-------ROTAS PEDIDO - ORDER------
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete('/order/item', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/order', isAuthenticated_1.isAuthenticated, new ListOrderController_1.ListOrderController().handle);
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
router.post('/order/exist', isAuthenticated_1.isAuthenticated, new OrderExistentController_1.OrderExistentController().handle);
router.get('/order/id', isAuthenticated_1.isAuthenticated, new ListOrderForIdController_1.ListOrderForIdController().handle);
router.get('/order/table', isAuthenticated_1.isAuthenticated, new ListOrderForTableController_1.ListOrderForTableController().handle);
router.put('/order/update', isAuthenticated_1.isAuthenticated, new UpdateQtdProductEqualsController_1.UpdateQtdProductEqualsController().handle);
router.get('/item/list', isAuthenticated_1.isAuthenticated, new ListItemController_1.ListItemController().handle);
//-------------ROTAS PARA O TAMANHO SIZE---------
router.post('/size', isAuthenticated_1.isAuthenticated, new addSizeCategoryController_1.AddSizeCategoryController().handle);
router.get('/category/size', isAuthenticated_1.isAuthenticated, new ListSizeCategory_1.ListSizeCategoryController().handle);
//-------------ROTAS PARA FINALIZAR A ORDER-------------
router.post('/order/account', isAuthenticated_1.isAuthenticated, new OrderAccountController_1.OrderAccountController().handle);
router.get('/order/account', isAuthenticated_1.isAuthenticated, new FindAccountTableController_1.FindAccountTableController().handle);
router.put('/account', isAuthenticated_1.isAuthenticated, new UpdateAccountController_1.UpdateAccountController().handle);
//-------------ROTAS PARA RELATORIO DE COMISSOES-----------
router.post('/report', isAuthenticated_1.isAuthenticated, new ReportCommissionController_1.ReportCommissionController().handle);
//------------- ROTAS PARA O FATURAMENTO ---------------------
router.post('/invoicing', isAuthenticated_1.isAuthenticated, new invoicingDateContrller_1.invoicingDateController().handle);
