const Wine = require('../models/wine')
const Note = require('../models/note')
const Vendor = require('../models/vendor')

module.exports = {
      new: newWine, 
      create,
      show,
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
            const wine = await Wine.create(req.body)
            res.redirect(`/wines/${wine._id}`, {'title': wine.name, wine})
      } catch (err) {
            console.log(err)
            res.render('wines/new', { errorMsg: err.message })
      }
}

 async function show(req, res) {
      const wine = await Wine.findById(req.params.id).populate('type').populate('maker') //need to add tags, vendors
      const notes = await Note.find({ 'wine': wine })
      const vendors = await Vendor.find({ 'wines': wine })
      res.render('wines/show', {title: wine.name, wine, notes, vendors})
 }

//  async function show(req, res) {
//       const wine = await Wine.findById(req.params.id)
//       const wineVendors = await Vendor.find({ 'wines': wine })
//       const vendors = await Vendor.find({ 'user': req.user._id})
//       res.render('vendors/show', {
//           title: 'Vendors',
//           errorMsg: '',
//           wine,
//           wineVendors,
//           vendors,
//       })
//   }

async function index(req, res) {
      const wines = await Wine.find({ 'user': req.user._id }).populate('type').populate('maker').populate('vendors').sort('name')
      console.log(wines)
      res.render('wines/index', {
            title: 'My Wine List', 
            wines
      })
 }

 async function warn(req, res) {
      const wine = await Wine.findById(req.params.id)
      res.render('wines/warning', {title: 'Confirm Delete?', wine})
 }

 async function deleteWine(req, res) {
      const wine = await Wine.findById({ '_id': req.params.id })
      if (!wine) return res.redirect('/wines/index')
      const notes = await Note.find({ 'wine': wine})
      await Note.deleteMany({ 'wine': wine})
      await Wine.deleteOne({ '_id': req.params.id})
      res.redirect('/wines/index')
    }