const { Contact } = require("../../models");

const post = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    message: "Contact added",
    data: {
      result,
    },
  });
};

module.exports = post;
