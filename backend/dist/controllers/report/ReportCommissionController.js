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
exports.ReportCommissionController = void 0;
const ReportCommissionService_1 = require("../../services/report/ReportCommissionService");
class ReportCommissionController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = new ReportCommissionService_1.ReportCommissionService();
            const { garcom, dataInicial, dataFinal } = req.body;
            const comm = yield report.execute({
                garcom,
                dataInicial,
                dataFinal
            });
            return res.json(comm);
        });
    }
}
exports.ReportCommissionController = ReportCommissionController;
