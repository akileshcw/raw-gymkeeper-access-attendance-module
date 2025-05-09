"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const date_fns_1 = require("date-fns");
const mongoose_1 = __importStar(require("mongoose"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}
const attendanceSchema = new mongoose_1.Schema({
    referenceId: mongoose_1.Schema.Types.ObjectId,
    timeIn: Date,
    timeOut: Date,
    present: Boolean,
    duration: Number,
    branchId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Branches" },
}, {
    timestamps: true,
});
// Define the pre-save middleware to check if the member has already logged the attendance for today
attendanceSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        try {
            if (!doc.isNew)
                return next();
            // Get the start and end of the day for the timeIn date
            const startOfDayTimeIn = (0, date_fns_1.startOfDay)(doc.timeIn);
            const endOfDayTimeIn = (0, date_fns_1.endOfDay)(doc.timeIn);
            // Check if an attendance record exists for the same member on the current date
            const existingAttendance = yield Attendance.findOne({
                referenceId: doc.referenceId,
                timeIn: { $gte: startOfDayTimeIn, $lte: endOfDayTimeIn },
            });
            if (existingAttendance) {
                // If a record exists, prevent saving the new attendance document
                const error = new CustomError("Attendance record already exists for this member on the same date.", 400);
                return next(error);
            }
            // If no existing record, proceed with saving
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
const Attendance = mongoose_1.default.models.Attendance ||
    mongoose_1.default.model("Attendance", attendanceSchema);
exports.default = Attendance;
