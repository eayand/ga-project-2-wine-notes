const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const makersCtrl = require('../controllers/makers')

router.get('/wines/:id/makers', ensureLoggedIn, makersCtrl.show)

router.post('/wines/:id/makers/new', ensureLoggedIn, makersCtrl.create)

router.post('/wines/:id/makers', ensureLoggedIn, makersCtrl.associate)

module.exports = router