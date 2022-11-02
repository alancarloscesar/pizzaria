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
exports.EstockProductQtdPriceController = void 0;
const EstockProductQtdPriceService_1 = require("../../services/product/EstockProductQtdPriceService");
class EstockProductQtdPriceController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estock = new EstockProductQtdPriceService_1.EstockProductQtdPriceService();
            const { name, tamanho, quantidade, price } = req.body;
            const updateEstoque = yield estock.execute({
                name,
                tamanho,
                quantidade,
                price
            });
            return res.json(updateEstoque);
        });
    }
}
exports.EstockProductQtdPriceController = EstockProductQtdPriceController;
