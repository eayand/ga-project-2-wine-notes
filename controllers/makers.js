const Wine = require('../models/wine')
const Maker = require('../models/maker')

module.exports = {
    create,
    show,
    associate,
 }

 async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
          const maker = await Maker.create(req.body)
          const wine = await Wine.findById(req.params.id)
          await maker.save()
          wine.maker = maker
          await wine.save()
          res.redirect(`/wines/${wine._id}`)
    } catch (err) {
          console.log(err)
          res.render('wines/show', { errorMsg: err.message })
    }
}

 async function show(req, res) {
    const wine = await Wine.findById(req.params.id)
    const makers = await Maker.find({})
    res.render('makers/show', {
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
        // maker.wines.push(wine)
        // await maker.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render(`/wines/${wine._id}/makers`, { errorMsg: err.message })
    }
}