const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    word: {type: String, required: true, unique: true},
    wines: [{type: Schema.Types.ObjectId, ref: 'Wine'}],
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Tag', tagSchema)