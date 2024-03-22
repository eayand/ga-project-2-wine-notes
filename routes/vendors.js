const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const vendorsCtrl = require('../controllers/vendors')

router.get('/wines/:id/vendors', ensureLoggedIn, vendorsCtrl.showAt)

router.post('/wines/:id/vendors', ensureLoggedIn, vendorsCtrl.createAt)

router.post('/wines/:id/vendors/associate', ensureLoggedIn, vendorsCtrl.associate)

router.get('/wines/:id/vendors/:vid/remove', ensureLoggedIn, vendorsCtrl.remove)

router.get('/vendors/index', ensureLoggedIn, vendorsCtrl.index)

router.post('/vendors', ensureLoggedIn, vendorsCtrl.create)

router.get('/vendors/:id', ensureLoggedIn, vendorsCtrl.show)

router.get('/vendors/:id/edit', ensureLoggedIn, vendorsCtrl.edit)

router.put('/vendors/:id', ensureLoggedIn, vendorsCtrl.update)

router.get('/vendors/:id/delete', ensureLoggedIn, vendorsCtrl.warn)

router.delete('/vendors/:id', ensureLoggedIn, vendorsCtrl.delete)

module.exports = router