const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    date: {type: Date, required: true},
    vintage: {
      type: Number, 
      min: 1000, 
      max: 9999, 
      // default: function() {
      // return new Date().getFullYear();
      // } instead of a default here, make the display start at this year; the year property is allowed to be blank, the purpose of a default is just to save the user a bunch of scrolling
    },
    rating: {type: Number, min: 1, max: 5, 
      // default: 5
      // this can also be blank, so same idea as above
    },
    body: String,
    wine: {type: Schema.Types.ObjectId, ref: 'Wine'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)