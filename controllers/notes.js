const Wine = require('../models/wine')
const Note = require('../models/note')

module.exports = {
    new: newNote,
    create,
 }

 async function newNote(req, res) {
    const wine = await Wine.findById(req.params.id)
    res.render('notes/new', { title: `Note on ${wine.name} `, wine, errorMsg: '' })
}

 async function create(req, res) {
    req.body.user = req.user._id
    const wine = await Wine.findById(req.params.id)
    try {
        const note = await Note.create(req.body)
        note.wine = wine
        await note.save()
        res.redirect(`/wines/${wine._id}`)
    } catch (err) {
          console.log(err)
          res.render('notes/new', { errorMsg: err.message })
    }
}

//  async function show(req, res) {
//     const wine = await Wine.findById(req.params.id)
//     const types = await Type.find({})
//     res.render('types/show', {
//         title: 'Wine Type',
//         errorMsg: '',
//         wine,
//         types,
//     })
// }

// async function associate(req, res) {
//     try {
//         const wine = await Wine.findById(req.params.id)
//         const type = req.body._id
//         wine.type = type
//         await wine.save()
//         // type.wines.push(wine)
//         // await type.save()
//         res.redirect(`/wines/${wine._id}`)
//     } catch (err) {
//         console.log(err)
//         res.render(`/wines/${wine._id}/types`, { errorMsg: err.message })
//     }
// }