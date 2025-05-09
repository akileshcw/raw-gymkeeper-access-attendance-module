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
const mqttClient = require("../mqtt/mqttClient");
const { shouldBeWhitelisted } = require("./accessService");
const { getAllMembers } = require("../integration/apiClient");
const mqttConfig = require("../../config/mqttConfig");
cron.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    // Daily at midnight
    console.log("Running daily access control check");
    const members = yield getAllMembers();
    for (const member of members) {
        const shouldWhitelist = yield shouldBeWhitelisted(member.id);
        const action = shouldWhitelist ? 0 : 1; // 0: Whitelist, 1: Blacklist
        mqttConfig.machineIds.forEach((machineId) => {
            const message = {
                messageId: `update-${member.id}-${Date.now()}`,
                operator: "EditPerson",
                info: { customId: member.id, personType: action },
            };
            mqttClient.publish(`mqtt/face/${machineId}`, JSON.stringify(message));
        });
    }
}));
module.exports = cron;
