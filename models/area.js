const mongoose = require('mongoose')
const Schema = mongoose.Schema

const areaSchema = new Schema({
    name: {type: String, required: true, unique: true},
    makers: [{type: Schema.Types.ObjectId, ref: 'Maker'}],
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Area', areaSchema)