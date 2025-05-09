"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getOnlineStatus, } = require("../modules/mqtt/handlers/heartbeatHandler");
const { enrollMember } = require("../modules/mqtt/handlers/enrollmentHandler");
const mqttConfig = require("../config/mqttConfig");
const router = express.Router();
router.get("/status", (req, res) => {
    res.json(getOnlineStatus());
});
router.post("/enroll", (req, res) => {
    const { memberId, imageBase64 } = req.body;
    mqttConfig.machineIds.forEach((machineId) => {
        enrollMember(memberId, imageBase64, machineId);
    });
    res.json({ message: "Enrollment initiated" });
});
module.exports = router;
