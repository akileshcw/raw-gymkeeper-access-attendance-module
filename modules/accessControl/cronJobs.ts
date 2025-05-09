const cron = require("node-cron");
const mqttClient = require("../mqtt/mqttClient");
const { shouldBeWhitelisted } = require("./accessService");
const { getAllMembers } = require("../integration/apiClient");
const mqttConfig = require("../../config/mqttConfig");

cron.schedule("0 0 * * *", async () => {
  // Daily at midnight
  console.log("Running daily access control check");
  const members = await getAllMembers();
  for (const member of members) {
    const shouldWhitelist = await shouldBeWhitelisted(member.id);
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
});

module.exports = cron;
