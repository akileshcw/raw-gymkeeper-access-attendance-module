const cron = require("node-cron");
const { getDailyAttendanceCount } = require("../attendance/attendanceService");
const { sendDailyVisitorNotification } = require("./notificationService");

cron.schedule("0 23 * * *", async () => {
  // Every day at 11 PM
  const today = new Date();
  const count = await getDailyAttendanceCount(today);
  await sendDailyVisitorNotification(count);
  console.log(`Notified owner: ${count} visitors today`);
});

module.exports = cron;
