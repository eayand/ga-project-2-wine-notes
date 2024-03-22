const Wine = require('../models/wine')
const Note = require('../models/note')

module.exports = {
    new: newNote,
    create,
    edit,
    update,
    warn,
    delete: deleteNote,
 }

 async function newNote(req, res) {
    const wine = await Wine.findById(req.params.id)
    res.render('notes/new', { title: `Note on ${wine.name}`, wine, errorMsg: '' })
}

 async function create(req, res) {
    req.body.user = req.user._id
    const wine = await Wine.findById(req.params.id)
    try {
        const note = await Note.create(req.body)
        note.wine = wine
        await note.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
          console.log(err)
          res.render('notes/new', { errorMsg: err.message })
    }
}

async function edit(req, res) {
    const note = await Note.findById(req.params.id).populate('wine')
    res.render('notes/edit', { title: 'Edit Your Note', note })
}

async function update(req, res) {
    const note = await Note.findById(req.params.id)
    note.vintage = req.body.vintage
    note.rating = req.body.rating
    note.body = req.body.body
    console.log(note)
    try {
        await note.save()
        res.redirect(`/wines/${note.wine}`)
    } catch (err) {
        console.log(err)
        res.render('notes/edit', { errorMsg: err.message })
    }
}

async function warn(req, res) {
    const note = await Note.findById(req.params.id)
    res.render('notes/warning', {title: 'Confirm Delete?', note})
}

async function deleteNote(req, res) {
    const note = await Note.findById({ '_id': req.params.id })
    if (!note) return res.redirect('/wines/index')
    const wineId = note.wine
    await Note.deleteOne({ '_id': req.params.id})
    res.redirect(`/wines/${wineId}`)
  }