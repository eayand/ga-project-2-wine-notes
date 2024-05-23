const Wine = require('../models/wine')

module.exports = {
      new: newWine,
      create,
      show,
      edit,
      update,
      index,
      warn,
      delete: deleteWine,
}

function newWine(req, res) {
      res.render('wines/new', {
            title: 'Add a Wine', errorMsg: ''
      })
}

async function create(req, res) {
      req.body.name = req.body.name.trim()
      req.body.user = req.user._id
      try {
            const existingWine = await Wine.find({'name': req.body.name})
            if (existingWine.length) {
                  res.redirect('/wines/index')
            } else {
                  const wine = await Wine.create(req.body)
                  res.redirect(`/wines/${wine._id}`)
            }
      } catch (err) {
            console.log(err)
            res.render('wines/index', { errorMsg: err.message })
      }
}

async function show(req, res) {
      const wine = await Wine.findById(req.params.id).populate('type').populate('maker').populate('vendors')
      const notes = wine.notes
      const rating = ((notes.reduce((acc, note) => acc + note.rating, 0)) / (notes.length)).toFixed(1)
      res.render('wines/show', { title: wine.name, wine, notes, rating })
}

async function edit(req, res) {
      const wine = await Wine.findById(req.params.id)
      res.render('wines/edit', { title: 'Update Name', wine })
}

async function update(req, res) {
      const wine = await Wine.findById(req.params.id)
      wine.name = req.body.name.trim()
      try {
            await wine.save()
            res.redirect(`${wine._id}`)
      } catch (err) {
            console.log(err)
            res.render('wines/edit', { errorMsg: err.message })
      }
}

async function index(req, res) {
      const wines = await Wine.find({ 'user': req.user._id }).populate('type').populate('maker').populate('vendors').sort('name')
      res.render('wines/index', {
            title: 'My Wine List',
            wines
      })
}

async function warn(req, res) {
      const wine = await Wine.findById(req.params.id)
      res.render('wines/warning', { title: 'Confirm Delete?', wine })
}

async function deleteWine(req, res) {
      const wine = await Wine.findById({ '_id': req.params.id })
      if (!wine) return res.redirect('/wines/index')
      await Wine.deleteOne({ '_id': req.params.id })
      res.redirect('/wines/index')
}