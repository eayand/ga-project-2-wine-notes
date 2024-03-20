const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const vendorsCtrl = require('../controllers/vendors')

router.get('/wines/:id/vendors', ensureLoggedIn, vendorsCtrl.show)

router.post('/wines/:id/vendors', ensureLoggedIn, vendorsCtrl.createAt)

router.post('/wines/:id/vendors/associate', ensureLoggedIn, vendorsCtrl.associate)

router.get('/wines/:id/vendors/:vid/remove', ensureLoggedIn, vendorsCtrl.remove)

router.get('/vendors/index', ensureLoggedIn, vendorsCtrl.index)

router.post('/vendors', ensureLoggedIn, vendorsCtrl.create)

module.exports = router