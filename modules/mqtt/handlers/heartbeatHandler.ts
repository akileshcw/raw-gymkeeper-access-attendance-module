let onlineStatus = {};

const heartbeatHandler = (data) => {
  const { facesluiceId, time } = data.info;
  onlineStatus[facesluiceId] = { lastHeartbeat: time, status: "online" };
  console.log(`Heartbeat from ${facesluiceId} at ${time}`);
};

const getOnlineStatus = () => onlineStatus;

module.exports = { heartbeatHandler, getOnlineStatus };
