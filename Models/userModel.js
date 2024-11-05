const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is a required field"] },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, "Password is a required field"],
    minlength: 8,
    validate: [
      (password) => password.match(/[a-z]/),
      "Password must contain at least one lowercase letter",
      (password) => password.match(/[A-Z]/),
      "Password must contain at least one uppercase letter",
      (password) => password.match(/[0-9]/),
      "Password must contain at least one number",
      (password) => password.match(/[!@#$%^&*(),.?":{}|<>]/),
      "Password must contain at least one special character",
    ],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is a required field"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

userSchema.pre("save", function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password with a salt factor of 10
  bcryptjs.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    // Override the cleartext password with the hashed one
    this.password = hash;
    this.confirmPassword = undefined;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
