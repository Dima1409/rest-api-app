const { Unauthorized } = require("http-errors");

const isOwner = (contactOwnerId, currentUserId) => {
  if (contactOwnerId.toString() !== currentUserId.toString()) {
    throw new Unauthorized("Not authorized");
  }
  return true;
};

module.exports = isOwner;
