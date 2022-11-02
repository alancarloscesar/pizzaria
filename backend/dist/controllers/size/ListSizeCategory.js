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
exports.ListSizeCategoryController = void 0;
const ListSizeCategoryService_1 = require("../../services/size/ListSizeCategoryService");
class ListSizeCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listSize = new ListSizeCategoryService_1.ListSizeCategoryService();
            const category_id = req.query.category_id;
            const size = yield listSize.execute({ category_id });
            return res.json(size);
        });
    }
}
exports.ListSizeCategoryController = ListSizeCategoryController;
