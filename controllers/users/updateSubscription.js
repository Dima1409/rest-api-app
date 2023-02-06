const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`User with id=${_id} not found`);
  }
  res.status(200).json({
    status: "success",
    message: "User updated",
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;