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
exports.AddSizeCategoryController = void 0;
const addSizeCategoryService_1 = require("../../services/size/addSizeCategoryService");
class AddSizeCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const addSize = new addSizeCategoryService_1.AddSizeCategoryService();
            const { name, category_id } = req.body;
            const size = yield addSize.execute({
                name, category_id
            });
            return res.json(size);
        });
    }
}
exports.AddSizeCategoryController = AddSizeCategoryController;
