const user_auth = require("../models/user_auth");
const errors = require("restify-errors");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const jwt = require("jsonwebtoken"); //creates token, expiration etc
const config = require("../config");

module.exports = (server) => {
  server.post("/register", (req, res, next) => {
    const { name, role, email, password } = req.body;

    const user = new user_auth({
      name,
      role,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash; // hash password

        //save user
        try {
          const new_user = await user.save();
          res.send(201);
          next();
        } catch (err) {
          return next(new errors.InternalError(err));
        }
      });
    });
  });

  //auth user

  server.post("/auth", async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await auth.authenticate(email, password);
      const { name, role } = user;

      //create jwt
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "15m",
      });

      const { iat, exp } = jwt.decode(token);

      //respond with token
      res.send({
        name,
        role,
        iat,
        exp,
        token,
      });
      next();
    } catch (err) {
      return next(new errors.UnauthorizedError(err));
    }
  });
};
