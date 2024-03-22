const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const typesCtrl = require('../controllers/types')

router.get('/wines/:id/types', ensureLoggedIn, typesCtrl.showAt)

router.get('/types/:id', ensureLoggedIn, typesCtrl.show)

router.post('/wines/:id/types/new', ensureLoggedIn, typesCtrl.create)

router.post('/wines/:id/types', ensureLoggedIn, typesCtrl.associate)

router.put('/types/:id', ensureLoggedIn, typesCtrl.update)

router.get('/types/:id/delete', ensureLoggedIn, typesCtrl.warn)

router.delete('/types/:id', ensureLoggedIn, typesCtrl.delete)

module.exports = router