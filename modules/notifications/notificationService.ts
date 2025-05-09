const { notifyOwner } = require("../integration/apiClient");

const sendDailyVisitorNotification = async (count) => {
  await notifyOwner(`Daily Visitor Count: ${count}`);
};

module.exports = { sendDailyVisitorNotification };
