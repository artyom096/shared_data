const Router = require("express");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Too short password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errorsValidation = validationResult(req);

      if (!errorsValidation.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Incorrect data", errorsValidation });
      }
      const { email, password } = req.body;

      const potentialNewUser = await User.findOne({ email });

      if (potentialNewUser) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 15);
      const newUser = new User({ email, password: hashPassword });
      await newUser.save();
      res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

module.exports = router;
