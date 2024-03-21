const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wineSchema = new Schema({
    name: {type: String, required: true},
    type: {type: Schema.Types.ObjectId, ref: 'Type'},
    maker: {type: Schema.Types.ObjectId, ref: 'Maker'},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    vendors: [{type: Schema.Types.ObjectId, ref: 'Vendor'}],
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Wine', wineSchema)