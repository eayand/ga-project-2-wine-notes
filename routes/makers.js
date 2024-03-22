const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const makersCtrl = require('../controllers/makers')

router.get('/wines/:id/makers', ensureLoggedIn, makersCtrl.showAt)

router.get('/makers/:id', ensureLoggedIn, makersCtrl.show)

router.post('/wines/:id/makers/new', ensureLoggedIn, makersCtrl.create)

router.post('/wines/:id/makers', ensureLoggedIn, makersCtrl.associate)

router.put('/makers/:id', ensureLoggedIn, makersCtrl.update)

router.get('/makers/:id/delete', ensureLoggedIn, makersCtrl.warn)

router.delete('/makers/:id', ensureLoggedIn, makersCtrl.delete)

module.exports = router