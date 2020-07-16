const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    //check if username and email don't exist
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(403).json({ message: "Username already exist" });
    }

    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(403).json({ message: "Email entered already exists" });
    }

    //create a new user
    const user = new User({ username, email, password });
    //Save User to database
    await user.save();

    //Generate a token for user that expires after one day for security purposes
    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.header("x-auth", token).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //fetch the user from database
    const user = await User.findOne({ username });

    //if user does not exists
    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or Password is incorrect" });
    }

    const passwordMatched = await user.comparePassword(password);

    if (!passwordMatched) {
      return res
        .status(400)
        .json({ message: "Username or Password is incorrect" });
    }

    //Generate a token for user that expires after one day for security purposes
    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.header("x-auth", token).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user, "-password -__v");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send("An error has occured");
  }
};
