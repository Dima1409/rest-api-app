const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let contacts;
  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite: favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
  }
  if (!favorite) {
    contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
  }
  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
