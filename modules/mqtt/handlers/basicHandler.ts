const basicHandler = (data) => {
  const { operator, info } = data;
  if (operator === "Online") {
    console.log(`Device ${info.facesluiceId} online at ${info.time}`);
  } else if (operator === "Offline") {
    console.log(`Device ${info.facesluiceId} offline at ${info.time}`);
  }
};

module.exports = basicHandler;
