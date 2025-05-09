const { recordAttendance } = require("../../attendance/attendanceService");

const machineHandler = async (data, machineId) => {
  const { operator, info } = data;
  if (operator === "Rec") {
    // Recognition record from face machine
    const { customId, result } = info;
    if (result === "ok") {
      await recordAttendance(customId, new Date(), machineId);
      console.log(`Access granted to ${customId} at ${machineId}`);
    } else {
      console.log(`Access denied to ${customId} at ${machineId}`);
    }
  }
};

module.exports = machineHandler;
