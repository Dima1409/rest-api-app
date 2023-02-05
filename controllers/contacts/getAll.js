const { Contact } = require("../../models");

const getAllContacts = async (userId, query) => {
  const { page = 1, limit = 20, favorite, name } = query;
  const skip = (page - 1) * limit;
  const pagination = {
    skip,
    limit: Number(limit),
  };
  const ownerInfo = "_id email";
  if (favorite && !name) {
    return Contact.find({ owner: userId, favorite: favorite }, "", pagination)
      .populate("owner", ownerInfo)
      .sort({ name: 1 });
  }

  if (name && !favorite) {
    return Contact.find(
      { owner: userId, name: { $regex: name } },
      "",
      pagination
    )
      .populate("owner", ownerInfo)
      .sort({ name: 1 });
  }

  if (favorite && name) {
    return Contact.find(
      { owner: userId, favorite: favorite, name: { $regex: name } },
      "",
      pagination
    )
      .populate("owner", ownerInfo)
      .sort({ name: 1 });
  }

  return Contact.find({ owner: userId }, "", pagination)
    .populate("owner", ownerInfo)
    .sort({ name: 1 });
};

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await getAllContacts(_id, req.query);
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
};

module.exports = getAll;
