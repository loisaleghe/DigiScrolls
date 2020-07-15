const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const { ObjectId } = mongoose.Schema;


const User = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      min: 3,
      max: [30, "Username cannot be greater than 30 characters"],
      required: [true, "Username is required"],
      validate: [
        /^\w+$/,
        "Username can only contain letters, nummbers and underscore",
      ],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email is required"],
      validate: [validator.isEmail, "Email is required"],
    },

    password: {
      type: String,
      min: 3,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);
//compare passwords to ensure they are the same 
User.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  }
}
//to encrypt user password before saving 
User.pre("save", async function (next) {
  try {
    if(!this.isModified("password")){
      return next()
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);

    return next()
  } catch (error) {
      return next(error)
  }
})

module.exports = mongoose.model("User", User);
