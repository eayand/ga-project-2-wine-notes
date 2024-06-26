const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Type', typeSchema)