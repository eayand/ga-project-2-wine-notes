const Wine = require('../models/wine')
const User = require('../models/user')
const Type = require('../models/type')

module.exports = {
      show,
 }


 async function show(req, res) {
    const wine = await Wine.findById(req.params.id)
    res.render('types/show', {
        title: 'Wine Type',
        errorMsg: '',
        wine,
    })
}