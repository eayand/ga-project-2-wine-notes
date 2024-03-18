const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    wines: [{type: Schema.Types.ObjectId, ref: 'Wine'}],
    vendors: [{type: Schema.Types.ObjectId, ref: 'Vendor'}],
  }, {
    timestamps: true
  })
  
module.exports = mongoose.model('User', userSchema);
