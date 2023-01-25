const {Contact} = require("../../models");

const post = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Contact added",
    data: {
      result,
    },
  });
};

module.exports = post;
