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
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateProductService {
    execute({ name, price, banner, category_id, tamanho, estoque, quantidade, pertencente }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name === '' || price === '') {
                throw new Error("os campos são obrigatorios");
            }
            else {
                const verifyNameProduct = yield prisma_1.default.product.findFirst({
                    where: {
                        name: name,
                        tamanho: tamanho
                    }
                });
                if (verifyNameProduct) { //se o nome e o tamanho do produto forem os mesmos dará a msg abaixo
                    throw new Error("Esse produto já foi cadastrado!!!");
                }
                const product = yield prisma_1.default.product.create({
                    data: {
                        name: name,
                        price: price,
                        banner: banner,
                        category_id: category_id,
                        tamanho: tamanho,
                        estoque: estoque,
                        quantidade: Number(quantidade),
                        pertencente: pertencente
                    }
                });
                return product;
            }
        });
    }
}
exports.CreateProductService = CreateProductService;
