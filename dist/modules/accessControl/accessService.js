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
const { getMemberDetails } = require("../integration/apiClient");
const appConfig = require("../../config/appConfig");
const shouldBeWhitelisted = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield getMemberDetails(memberId);
    if (!member || member.membershipExpired)
        return false;
    const multiBranch = member.membership.category === "3 Months" ||
        member.membership.category === "6 Months" ||
        member.membership.category === "1 Year";
    const paymentOverdue = member.paymentBalance > appConfig.paymentThreshold;
    return !paymentOverdue && member.status === "active" && multiBranch;
});
module.exports = { shouldBeWhitelisted };
