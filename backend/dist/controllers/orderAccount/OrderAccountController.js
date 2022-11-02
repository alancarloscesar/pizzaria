"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderAccountController = void 0;
const OrderAccountService_1 = require("../../services/orderAccount/OrderAccountService");
class OrderAccountController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { valor_conta, conta_comissao, valor_comissao, garcom, order_id, user_id } = req.body;
            const orderA = new OrderAccountService_1.OrderAccountService();
            const orderF = yield orderA.execute({
                valor_conta,
                conta_comissao,
                valor_comissao,
                garcom,
                order_id,
                user_id
            });
            return res.json(orderF);
        });
    }
}
exports.OrderAccountController = OrderAccountController;
