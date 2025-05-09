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
const Attendance = require("./attendanceModel");
const recordAttendance = (memberId, entryTime, machineId) => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = new Attendance({
        referenceId: memberId,
        timeIn: entryTime,
        branchId: machineId,
    });
    yield attendance.save();
});
const getDailyAttendanceCount = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));
    return yield Attendance.countDocuments({
        timeIn: { $gte: start, $lte: end },
    });
});
const getLastAttendance = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Attendance.findOne({ memberId }).sort({ timeIn: -1 });
});
module.exports = {
    recordAttendance,
    getDailyAttendanceCount,
    getLastAttendance,
};
