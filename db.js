const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://osuolaledeveloper:osuolaledeveloper@ecommerce.ab6u5r4.mongodb.net/user");
const { Schema } = mongoose;

const userSchema = new Schema({
 email: String,
 password: String,
 firstName: String,
 lastName:  String,
 phonenumber: Number
  }
);
const user = mongoose.model('user', userSchema);


module.exports = user