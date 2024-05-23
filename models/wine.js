const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    vintage: {
        type: Number,
        max: new Date().getFullYear()
    },
    rating: { type: Number, min: 1, max: 5, },
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
})

const wineSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    maker: { type: Schema.Types.ObjectId, ref: 'Maker' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    vendors: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }],
    notes: [noteSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('Wine', wineSchema)