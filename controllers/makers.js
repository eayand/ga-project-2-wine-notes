const Wine = require('../models/wine')
const Maker = require('../models/maker')

module.exports = {
    create,
    show,
    showAt,
    associate,
    update,
    warn,
    delete: deleteMaker,
}

async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
        const wine = await Wine.findById(req.params.id)
        const existingMaker = await Maker.find({'name': req.body.name})
        if (existingMaker.length) {
            wine.maker = existingMaker[0]._id
            await wine.save()
        } else {
            const maker = await Maker.create(req.body)
            wine.maker = maker
            await wine.save()
        }
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render('wines/show', { errorMsg: err.message })
    }
}

async function show(req, res) {
    const maker = await Maker.findById(req.params.id)
    const wines = await Wine.find({ maker: maker })
    res.render('makers/show', { title: maker.name, maker, wines })
}

async function showAt(req, res) {
    const wine = await Wine.findById(req.params.id)
    const makers = await Maker.find({ 'user': req.user._id })
    res.render('makers/showAt', {
        title: 'Wine Maker',
        errorMsg: '',
        wine,
        makers,
    })
}

async function associate(req, res) {
    try {
        const wine = await Wine.findById(req.params.id)
        const maker = await Maker.findById(req.body.makerId)
        wine.maker = maker
        await wine.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render(`/wines/${wine._id}/makers`, { errorMsg: err.message })
    }
}

async function update(req, res) {
    const maker = await Maker.findById(req.params.id)
    maker.name = req.body.name.trim()
    await maker.save()
    res.redirect(`/makers/${maker._id}`)
}

async function warn(req, res) {
    const maker = await Maker.findById(req.params.id)
    res.render('makers/warning', {title: 'Confirm Delete?', maker})
}

async function deleteMaker(req, res) {
    const maker = await Maker.findById({ '_id': req.params.id })
    if (!maker) return res.redirect('/wines/index')
    await Maker.deleteOne({ '_id': req.params.id})
    res.redirect('/wines/index')
}