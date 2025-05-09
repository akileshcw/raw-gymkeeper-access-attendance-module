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
const axios = require("axios");
const apiClient = axios.create({
    baseURL: process.env.NEXTJS_API_URL || "http://localhost:3000/api",
});
const getMemberDetails = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield apiClient.get(`/members/${memberId}`);
    return data;
});
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield apiClient.get("/members");
    return data;
});
const notifyOwner = (message) => __awaiter(void 0, void 0, void 0, function* () {
    yield apiClient.post("/notifications", { message });
});
const deleteMemberData = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    yield apiClient.delete(`/members/${memberId}`);
});
module.exports = {
    getMemberDetails,
    getAllMembers,
    notifyOwner,
    deleteMemberData,
};
