const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  const messageEmail = {
    to: email,
    subject: "Confirmation of registration!",
    text: "verify registration",
    html: `<a target="_blank" href="http://localhost:3030/api/users/verify/${verificationToken}">verify registration</a>`,
  };
  await sendEmail(messageEmail);
  res.status(201).json({
    status: "created",
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
      },
    },
  });
};

module.exports = register;
