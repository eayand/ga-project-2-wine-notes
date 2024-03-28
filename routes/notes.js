const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const notesCtrl = require('../controllers/notes')

router.get('/wines/:id/notes/new', ensureLoggedIn, notesCtrl.new)

router.post('/wines/:id/notes', ensureLoggedIn, notesCtrl.create)

router.get('/wines/:id/notes/:nid/edit', ensureLoggedIn, notesCtrl.edit)

router.put('/wines/:id/notes/:nid', ensureLoggedIn, notesCtrl.update)

router.get('/wines/:id/notes/:nid/delete', ensureLoggedIn, notesCtrl.warn)

router.delete('/wines/:id/notes/:nid', ensureLoggedIn, notesCtrl.delete)

module.exports = router