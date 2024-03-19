const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const winesCtrl = require('../controllers/wines')

router.get('/index', ensureLoggedIn, winesCtrl.index)

router.get('/new', ensureLoggedIn, winesCtrl.new)

router.get('/:id', ensureLoggedIn, winesCtrl.show)

router.post('/', ensureLoggedIn, winesCtrl.create)

router.delete('/:id', ensureLoggedIn, winesCtrl.delete)

module.exports = router