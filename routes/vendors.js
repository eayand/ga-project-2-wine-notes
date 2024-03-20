const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const vendorsCtrl = require('../controllers/vendors')

router.get('/wines/:id/vendors', ensureLoggedIn, vendorsCtrl.show)

router.post('/wines/:id/vendors/new', ensureLoggedIn, vendorsCtrl.create)

router.post('/wines/:id/vendors/associate', ensureLoggedIn, vendorsCtrl.associate)

router.get('/wines/:id/vendors/:vid/remove', ensureLoggedIn, vendorsCtrl.remove)

module.exports = router