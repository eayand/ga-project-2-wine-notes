const Wine = require('../models/wine')

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
    const wine = await Wine.findById(req.params.id)
    req.body.user = req.user._id
    try {
        wine.notes.push(req.body)
        await wine.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render('notes/new', { errorMsg: err.message })
    }
}

async function edit(req, res) {
    const wine = await Wine.findById(req.params.id)
    console.log(wine)
    const note = wine.notes.id(req.params.nid)
    res.render('notes/edit', { title: 'Edit Your Note', wine, note })
}

async function update(req, res) {
    const wine = await Wine.findById(req.params.id)
    const note = wine.notes.id(req.params.nid)
    note.vintage = req.body.vintage
    note.rating = req.body.rating
    note.body = req.body.body
    try {
        await wine.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render('notes/edit', { errorMsg: err.message, wine, note })
    }
}

async function warn(req, res) {
    const wine = await Wine.findById(req.params.id)
    const note = wine.notes.id(req.params.nid)
    res.render('notes/warning', { title: 'Confirm Delete?', wine, note })
}

async function deleteNote(req, res) {
    const wine = await Wine.findById(req.params.id)
    if (!wine) return res.redirect('/wines/index')
    const note = wine.notes.pull(req.params.nid)
    if (!note) return res.redirect('/wines/index')
    await wine.save()
    res.redirect(`/wines/${wine._id}`)
}