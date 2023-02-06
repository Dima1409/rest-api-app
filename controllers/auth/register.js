const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    status: "created",
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = register;
