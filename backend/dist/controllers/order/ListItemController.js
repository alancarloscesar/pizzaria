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
exports.ListItemController = void 0;
const ListItemsService_1 = require("../../services/order/ListItemsService");
class ListItemController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = new ListItemsService_1.ListItemService();
            const order_id = req.query.order_id;
            const product_id = req.query.product_id;
            const response = yield list.execute({
                order_id,
                product_id
            });
            return res.json(response);
        });
    }
}
exports.ListItemController = ListItemController;
