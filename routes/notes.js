const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const notesCtrl = require('../controllers/notes')

// router.get('/wines/:id/notes', ensureLoggedIn, typesCtrl.show)

// router.get('/:id', typesCtrl.show)

router.get('/wines/:id/notes/new', ensureLoggedIn, notesCtrl.new)

router.post('/wines/:id/notes', ensureLoggedIn, notesCtrl.create)

module.exports = router