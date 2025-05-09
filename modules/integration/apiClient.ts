const axios = require("axios");

const apiClient = axios.create({
  baseURL: process.env.NEXTJS_API_URL || "http://localhost:3000/api",
});

const getMemberDetails = async (memberId) => {
  const { data } = await apiClient.get(`/members/${memberId}`);
  return data;
};

const getAllMembers = async () => {
  const { data } = await apiClient.get("/members");
  return data;
};

const notifyOwner = async (message) => {
  await apiClient.post("/notifications", { message });
};

const deleteMemberData = async (memberId) => {
  await apiClient.delete(`/members/${memberId}`);
};

module.exports = {
  getMemberDetails,
  getAllMembers,
  notifyOwner,
  deleteMemberData,
};
