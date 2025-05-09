const mqtt = require("mqtt");
const mqttConfig = require("../../config/mqttConfig");
const heartbeatHandler =
  require("./handlers/heartbeatHandler").heartbeatHandler;
const basicHandler = require("./handlers/basicHandler");
const machineHandler = require("./handlers/machineHandler");

const client = mqtt.connect(mqttConfig);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("mqtt/face/heartbeat");
  client.subscribe("mqtt/face/basic");
  mqttConfig.machineIds.forEach((machineId) => {
    client.subscribe(`mqtt/face/${machineId}`);
  });
  console.log(
    "Subscribed to topics \n 1. mqtt/face/heartbeat \n 2. mqtt/face/basic \n 3. mqtt/face/{machineId}"
  );
});

client.on("error", (error) => {
  console.error("MQTT connection error:", error);
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());
  if (topic === "mqtt/face/heartbeat") {
    heartbeatHandler(data);
  } else if (topic === "mqtt/face/basic") {
    basicHandler(data);
  } else if (topic.startsWith("mqtt/face/")) {
    machineHandler(data, topic.split("/")[2]); // Extract machineId
  }
});

module.exports = client;
