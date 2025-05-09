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
const cron = require("node-cron");
const { getDailyAttendanceCount } = require("../attendance/attendanceService");
const { sendDailyVisitorNotification } = require("./notificationService");
cron.schedule("0 23 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    // Every day at 11 PM
    const today = new Date();
    const count = yield getDailyAttendanceCount(today);
    yield sendDailyVisitorNotification(count);
    console.log(`Notified owner: ${count} visitors today`);
}));
module.exports = cron;
