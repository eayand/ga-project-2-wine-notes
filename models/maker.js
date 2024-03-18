const mongoose = require('mongoose')
const Schema = mongoose.Schema

const makerSchema = new Schema({
    name: {type: String, required: true},
    area: {type: Schema.Types.ObjectId, ref: 'Area'},
    wines: [{type: Schema.Types.ObjectId, ref: 'Wine'}],
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Maker', makerSchema)