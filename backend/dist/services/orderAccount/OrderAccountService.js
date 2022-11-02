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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderAccountService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class OrderAccountService {
    execute({ valor_conta, conta_comissao, valor_comissao, garcom, order_id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma_1.default.orderAccount.create({
                data: {
                    valor_conta: valor_conta,
                    conta_comissao: conta_comissao,
                    valor_comissao: valor_comissao,
                    garcom: garcom,
                    order_id: order_id,
                    user_id: user_id
                }
            });
            return order;
        });
    }
}
exports.OrderAccountService = OrderAccountService;
