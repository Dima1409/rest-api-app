const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
