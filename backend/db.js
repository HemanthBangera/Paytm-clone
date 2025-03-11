const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Hemanth:YZGhWSZoUAOJnyev@cluster0.lbhyr.mongodb.net/paytm_project"
);

const UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
});

const AccountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountsSchema);
module.exports = {
  User,
  Account,
};
