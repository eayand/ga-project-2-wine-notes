const Wine = require('../models/wine')
const Type = require('../models/type')

module.exports = {
    create,
    show,
    associate,
 }

 async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.user = req.user._id
    try {
          const type = await Type.create(req.body)
          const wine = await Wine.findById(req.params.id)
        //   type.wines.push(req.params.id)
        //   await type.save()
          wine.type = type._id
          await wine.save()
          res.redirect(`/wines/${wine._id}`)
    } catch (err) {
          console.log(err)
          res.render(`/wines/${wine._id}/types`, { errorMsg: err.message })
    }
}

 async function show(req, res) {
    const wine = await Wine.findById(req.params.id)
    const types = await Type.find({})
    res.render('types/show', {
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
        // type.wines.push(wine)
        // await type.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
        console.log(err)
        res.render(`/wines/${wine._id}/types`, { errorMsg: err.message })
    }
}