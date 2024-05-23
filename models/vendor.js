const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vendorSchema = new Schema({
    name: {type: String, required: true, unique: true},
    address: String,
    thoughts: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Vendor', vendorSchema)