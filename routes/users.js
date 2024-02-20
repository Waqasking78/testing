const mongoose = require("mongoose");
mongoose.connect(`${process.env.MONGODB_URL}/tt`);
const plm = require('passport-local-mongoose')

const userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userschema.plugin(plm)

module.exports = mongoose.model("user", userschema);
