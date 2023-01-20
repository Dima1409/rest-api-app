const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(createError(411, "Fields cannot be empty"));
    }
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
