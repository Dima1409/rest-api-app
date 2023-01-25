const {Contact} = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
