const mqttConfig = {
  host: process.env.MQTT_BROKER_URL,
  clientId: process.env.MQTT_CLIENT_ID || "access-attendance-service",
  username: process.env.MQTT_USERNAME || "admin",
  password: process.env.MQTT_PASSWORD || "password",
  port: process.env.MQTT_PORT || 8883, // Default port for MQTT over SSL/TLS
  protocol: "mqtts", // Use mqtts for secure connection
  machineIds: process.env.MACHINE_IDS
    ? process.env.MACHINE_IDS.split(",")
    : ["1306612"], // Array of turnstile machine IDs
};

module.exports = mqttConfig;
