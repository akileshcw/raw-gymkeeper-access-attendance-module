"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqttClient = require("../mqttClient");
const enrollMember = (memberId, imageBase64, machineId) => {
    const message = {
        messageId: `enroll-${Date.now()}`,
        operator: "EditPerson",
        info: {
            customId: memberId,
            personType: 0, // Whitelist by default
            tempCardType: 0, // Permanent list
            pic: imageBase64,
        },
    };
    mqttClient.publish(`mqtt/face/${machineId}`, JSON.stringify(message));
    console.log(`Enrolling member ${memberId} to machine ${machineId}`);
};
module.exports = { enrollMember };
