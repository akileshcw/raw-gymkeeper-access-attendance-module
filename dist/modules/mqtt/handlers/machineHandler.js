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
const { recordAttendance } = require("../../attendance/attendanceService");
const machineHandler = (data, machineId) => __awaiter(void 0, void 0, void 0, function* () {
    const { operator, info } = data;
    if (operator === "Rec") {
        // Recognition record from face machine
        const { customId, result } = info;
        if (result === "ok") {
            yield recordAttendance(customId, new Date(), machineId);
            console.log(`Access granted to ${customId} at ${machineId}`);
        }
        else {
            console.log(`Access denied to ${customId} at ${machineId}`);
        }
    }
});
module.exports = machineHandler;
