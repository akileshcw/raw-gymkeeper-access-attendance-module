const Attendance = require("./attendanceModel");

const recordAttendance = async (memberId, entryTime, machineId) => {
  const attendance = new Attendance({
    referenceId: memberId,
    timeIn: entryTime,
    branchId: machineId,
  });
  await attendance.save();
};

const getDailyAttendanceCount = async (date) => {
  const start = new Date(date.setHours(0, 0, 0, 0));
  const end = new Date(date.setHours(23, 59, 59, 999));
  return await Attendance.countDocuments({
    timeIn: { $gte: start, $lte: end },
  });
};

const getLastAttendance = async (memberId) => {
  return await Attendance.findOne({ memberId }).sort({ timeIn: -1 });
};

module.exports = {
  recordAttendance,
  getDailyAttendanceCount,
  getLastAttendance,
};
