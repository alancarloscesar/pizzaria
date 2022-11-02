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
exports.ListNameUserController = void 0;
const ListNameUser_1 = require("../../services/user/ListNameUser");
class ListNameUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = new ListNameUser_1.ListNameUser();
            const listUser = yield list.execute();
            return res.json(listUser);
        });
    }
}
exports.ListNameUserController = ListNameUserController;
