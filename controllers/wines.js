const Wine = require('../models/wine')
const User = require('../models/user')

module.exports = {
      new: newWine, 
      create,
      show,
      index,
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
            const wine = await Wine.create(req.body)
            const user = await User.findById(req.user._id)
            await user.wines.push(wine._id)
            await user.save()
            res.redirect(`/wines/${wine._id}`, {title: wine.name, wine} )
      } catch (err) {
            console.log(err)
            res.render('wines/new', { errorMsg: err.message })
      }
}

 async function show(req, res) {
      const wine = await Wine.findById(req.params.id).populate('type') //need to add maker, tags, vendors, notes 
      res.render('wines/show', {title: wine.name, wine})
 }

async function index(req, res) {
      const wines = await Wine.find({ 'user': req.user._id })
       res.render('wines/index', {
             title: 'My Wine List', 
             wines
       })
 }

 async function deleteWine(req, res) {
      const wine = await Wine.findById({ '_id': req.params.id })
      if (!wine) return res.redirect('/wines/index')
      await Wine.deleteOne({ '_id': req.params.id})
      res.redirect('/wines/index')
    }