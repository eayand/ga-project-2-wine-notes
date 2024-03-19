const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const typesCtrl = require('../controllers/types')

router.get('/wines/:id/types', ensureLoggedIn, typesCtrl.show)

// router.get('/:id', typesCtrl.show)

router.post('/wines/:id/types/new', ensureLoggedIn, typesCtrl.create)

router.post('/wines/:id/types', ensureLoggedIn, typesCtrl.associate)

module.exports = router