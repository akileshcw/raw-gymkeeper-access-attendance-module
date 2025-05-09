const app = require("./app");
const appConfig = require("./config/appConfig");

require("./modules/mqtt/mqttClient"); // Initialize MQTT
require("./modules/accessControl/cronJobs"); // Start access control cron
require("./modules/notifications/cronJobs"); // Start notification cron

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
