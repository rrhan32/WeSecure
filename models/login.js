const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{
    type:String,
  },
    email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;

