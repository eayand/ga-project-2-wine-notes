const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    vintage: {
      type: Number, 
      max: new Date().getFullYear() 
    },
    rating: {type: Number, min: 1, max: 5, 
    },
    body: String,
    wine: {type: Schema.Types.ObjectId, ref: 'Wine'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)