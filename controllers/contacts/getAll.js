const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    favorite ? { owner: _id, favorite: favorite } : { owner: _id },
    "",
    {
      skip,
      limit: Number(limit),
    }
  )
    .populate("owner", "_id name email")
    .sort({ name: 1 });
  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
