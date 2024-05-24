const Wine = require('../models/wine')
const Vendor = require('../models/vendor')
const wine = require('../models/wine')

module.exports = {
    create,
    createAt,
    index,
    show,
    showAt,
    edit,
    update,
    associate,
    remove,
    warn,
    delete: deleteVendor,
}

async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
        const existingVendor = await Vendor.find({'name': req.body.name})
        if (existingVendor.length) {
            res.redirect('/vendors/index')
        } else {
            const vendor = await Vendor.create(req.body)
            res.redirect(`/vendors/${vendor._id}/edit`)
        }
    } catch (err) {
        console.log(err)
        res.render('vendors/index', { errorMsg: err.message })
    }
}

async function createAt(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
        const wine = await Wine.findById(req.params.id)
        const existingVendor = await Vendor.find({'name': req.body.name})
        if (!existingVendor.length) {
            const vendor = await Vendor.create(req.body)
            wine.vendors.push(vendor._id)
            await wine.save()
        } else if (!wine.vendors.includes(existingVendor[0]._id)) {
            wine.vendors.push(existingVendor[0]._id)
            await wine.save()
        }
        res.redirect(`/wines/${wine._id}/vendors`)
    } catch (err) {
        console.log(err)
        res.render('vendors/showAt', { errorMsg: err.message })
    }
}

async function index(req, res) {
    const vendors = await Vendor.find({ 'user': req.user._id }).sort('name')
    const wines = await Wine.find({ 'user': req.user._id }).sort('name')
    res.render('vendors/index', {
        title: 'My Vendor List',
        vendors,
        wines
    })
}

async function show(req, res) {
    const vendor = await Vendor.findById(req.params.id)
    const wines = await Wine.find({'vendors': req.params.id})
    res.render('vendors/show', { title: vendor.name, vendor, wines })
}

async function showAt(req, res) {
    const wine = await Wine.findById(req.params.id)
    const wineVendors = await Vendor.find({ _id: { $in: wine.vendors } }).sort('name')
    const vendors = await Vendor.find({ 'user': req.user._id, _id: {$nin: wine.vendors} }).sort('name')
    res.render('vendors/showAt', {
        title: 'Vendors',
        errorMsg: '',
        wine,
        wineVendors,
        vendors,
    })
}

async function edit(req, res) {
    const vendor = await Vendor.findById(req.params.id)
    res.render('vendors/edit', { title: 'Edit Vendor', vendor })
}

async function update(req, res) {
    const vendor = await Vendor.findById(req.params.id)
    vendor.name = req.body.name
    vendor.address = req.body.address
    vendor.thoughts = req.body.thoughts
    try {
        await vendor.save()
        res.redirect(`${vendor._id}`)
    } catch (err) {
        console.log(err)
        res.render('vendors/edit', { errorMsg: err.message })
    }
}

async function associate(req, res) {
    try {
        const wine = await Wine.findById(req.params.id)
        const vendor = await Vendor.findById(req.body.vendorId)
        wine.vendors.push(vendor)
        await wine.save()
        res.redirect(`/wines/${wine._id}/vendors`)
    } catch (err) {
        console.log(err)
        const wine = await Wine.findById(req.params.id)
        const vendor = req.body._id
        res.render('vendors/showAt', { errorMsg: err.message, title: 'Error', wine, vendor })
    }
}

async function remove(req, res) {
    try {
        const wine = await Wine.findById(req.params.id)
        const vendorRef = wine.vendors.indexOf(req.params.vid)
        wine.vendors.splice(vendorRef, 1)
        await wine.save()
        res.redirect(`/wines/${wine._id}/vendors`)
    } catch (err) {
        console.log(err)
        const wine = await Wine.findById(req.params.id)
        const vendor = await Vendor.findById(req.params.vid)
        const vendorRef = wine.vendors.indexOf(vendor)
        res.render('vendors/show', { errorMsg: err.message, title: 'Error' })
    }
}

async function warn(req, res) {
    const vendor = await Vendor.findById(req.params.id)
    res.render('vendors/warning', { title: 'Confirm Delete?', vendor })
}

async function deleteVendor(req, res) {
    const vendor = await Vendor.findById({ '_id': req.params.id })
    if (!vendor) return res.redirect('/vendors/index')
    const wines = await Wine.find({'vendor': req.params.id})
    wines.forEach( function(w) {
        const vendorRef = w.vendors.indexOf(req.params.id)
        w.vendors.splice(vendorRef, 1)
        w.save()
    } )
    await Vendor.deleteOne({ '_id': req.params.id })
    res.redirect('/vendors/index')
}