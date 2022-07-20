const Router = require("express");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = new Router();

const secretKey = config.get("secretKey");

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

      const hashPassword = await bcrypt.hash(password, 8);
      const newUser = new User({ email, password: hashPassword });
      await newUser.save();
      res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, currentUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is invalid" });
    }

    const token = jwt.sign({ id: currentUser.id }, secretKey, { expiresIn: "24h" });

    res.json({
      token,
      user: {
        id: currentUser.id,
        email: currentUser.email,
        diskSpace: currentUser.diskSpace,
        usedSpace: currentUser.usedSpace,
        avatar: currentUser.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

module.exports = router;
