const mongoose = require("mongoose");
const app = require("../../app");
const supertest = require("supertest");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { DB_HOST, SECRET_KEY } = process.env;

describe("auth", () => {
  const id = new mongoose.Types.ObjectId();
  const email = "test2@mail.com";
  const password = "somePass";
  const name = "testUser";
  const mUser = {
    _id: id,
    name,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    token: jwt.sign({ _id: id }, SECRET_KEY),
    avatarURL: gravatar.url(email),
  };
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_HOST);
  });
  afterAll(async () => {
    await User.deleteMany({ _id: id });
    await mongoose.disconnect();
  });
  beforeEach(async () => {
    await User.deleteMany({ _id: id });
    const newUser = new User(mUser);
    await newUser.save();
  });

  describe("signUp test", () => {
    it("if email already in use", async () => {
      const response = await supertest(app).post("/api/auth/register").send({
        name: mUser.name,
        email: mUser.email,
        password: mUser.password,
      });
      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe(`Email ${mUser.email} in use`);
    });
  });

  describe("login", () => {
    it("user logging and getting a token", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: mUser.email,
        password: password,
      });

      const { email, subscription } = response.body.data.user;
      const { token } = response.body.data;
      expect(response.statusCode).toBe(200);
      expect(email).toBe(mUser.email);
      expect(subscription).toBe("starter");
      expect(token).not.toBe(null);
      const result = {
        statusCode: response.statusCode,
        token: token,
        user: {
          email: email.toString(),
          subscription: subscription.toString(),
        },
      };
      console.log(result);
    });
    it("if the password or e-mail is wrong", async () => {
      const wrongPass = "wrongPass";
      const response = await supertest(app).post("/api/auth/login").send({
        email: mUser.email,
        password: wrongPass,
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
