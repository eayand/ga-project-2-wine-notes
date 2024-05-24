const mongoose = require('mongoose')
const Schema = mongoose.Schema

const makerSchema = new Schema({
    name: {type: String, required: true, unique: true},
    area: {type: Schema.Types.ObjectId, ref: 'Area'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Maker', makerSchema)