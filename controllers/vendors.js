const Wine = require('../models/wine')
const Vendor = require('../models/vendor')

module.exports = {
    create,
    show,
    associate,
    remove,
 }

 async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
          const vendor = await Vendor.create(req.body)
          const wine = await Wine.findById(req.params.id)
          vendor.wines.push(req.params.id)
          await vendor.save()
          wine.vendors.push(vendor)
          await wine.save()
          res.redirect(`/wines/${wine._id}`)
    } catch (err) {
          console.log(err)
          res.render('vendors/show', { errorMsg: err.message, title: 'Error', vendor, wine })
    }
}

 async function show(req, res) {
    const wine = await Wine.findById(req.params.id)
    const wineVendors = await Vendor.find({ 'wines': wine })
    const vendors = await Vendor.find({ 'user': req.user._id})
    res.render('vendors/show', {
        title: 'Vendors',
        errorMsg: '',
        wine,
        wineVendors,
        vendors,
    })
}

async function associate(req, res) {
    try {
        const wine = await Wine.findById(req.params.id)
        const vendor = req.body._id
        wine.vendors.push = vendor
        await wine.save()
        vendor.wines.push(wine)
        await vendor.save()
        res.redirect(`/wines/${wine._id}/vendors`)
    } catch (err) {
        console.log(err)
        res.render(`/wines/${wine._id}/vendors`, { errorMsg: err.message, title: 'Error' })
    }
}

async function remove(req, res) {
    try {
        const wine = await Wine.findById(req.params.id)
        const vendor = await Vendor.findById(req.params.vid)
        const wineRef = vendor.wines.indexOf(wine)
        const vendorRef = wine.vendors.indexOf(vendor)
        vendor.wines.splice(wineRef, 1)
        wine.vendors.splice(vendorRef, 1)
        await wine.save()
        await vendor.save()
        res.redirect(`/wines/${wine._id}/vendors`)
    } catch (err) {
        console.log(err)
        res.render('vendors/show', { errorMsg: err.message, title: 'Error' })
    }
}