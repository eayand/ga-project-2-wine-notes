const Wine = require('../models/wine')
const Type = require('../models/type')

module.exports = {
    create,
    show,
    showAt,
    associate,
    update,
    warn,
    delete: deleteType,
}

async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
        const wine = await Wine.findById(req.params.id)
        const existingType = await Type.find({'name': req.body.name})
        if (existingType.length) {
            wine.type = existingType[0]._id
            await wine.save()
        } else {
            const type = await Type.create(req.body)
            wine.type = type._id
            await wine.save()
        }
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render(`/wines/${wine._id}/types`, { errorMsg: err.message })
    }
}

async function show(req, res) {
    const type = await Type.findById(req.params.id)
    const wines = await Wine.find({ 'type': type, 'user': req.user._id })
    res.render('types/show', { title: type.name, type, wines })
}

async function showAt(req, res) {
    const wine = await Wine.findById(req.params.id)
    const types = await Type.find({ 'user': req.user._id })
    res.render('types/showAt', {
        title: 'Wine Type',
        errorMsg: '',
        wine,
        types,
    })
}

async function associate(req, res) {
    try {
        const wine = await Wine.findById(req.params.id)
        const type = await Type.findById(req.body.typeId)
        wine.type = type
        await wine.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render('types/showAt', { errorMsg: err.message })
    }
}

async function update(req, res) {
    const type = await Type.findById(req.params.id)
    type.name = req.body.name.trim()
    await type.save()
    res.redirect(`/types/${type._id}`)
}

async function warn(req, res) {
    const type = await Type.findById(req.params.id)
    res.render('types/warning', { title: 'Confirm Delete?', type })
}

async function deleteType(req, res) {
    const type = await Type.findById({ '_id': req.params.id })
    if (!type) return res.redirect('/wines/index')
    await Type.deleteOne({ '_id': req.params.id })
    res.redirect('/wines/index')
}