const { getMemberDetails } = require("../integration/apiClient");
const appConfig = require("../../config/appConfig");

const shouldBeWhitelisted = async (memberId) => {
  const member = await getMemberDetails(memberId);
  if (!member || member.membershipExpired) return false;
  const multiBranch =
    member.membership.category === "3 Months" ||
    member.membership.category === "6 Months" ||
    member.membership.category === "1 Year";
  const paymentOverdue = member.paymentBalance > appConfig.paymentThreshold;

  return !paymentOverdue && member.status === "active" && multiBranch;
};

module.exports = { shouldBeWhitelisted };
