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
exports.AddSizeCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddSizeCategoryService {
    execute({ name, category_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificaTam = yield prisma_1.default.size.findFirst({
                where: {
                    name: name,
                    category_id: category_id
                }
            });
            if (verificaTam) {
                throw new Error("Este tamanho já está cadastrado.");
            }
            else {
                const size = yield prisma_1.default.size.create({
                    data: {
                        name: name,
                        category_id: category_id
                    }
                });
                return size;
            }
        });
    }
}
exports.AddSizeCategoryService = AddSizeCategoryService;
