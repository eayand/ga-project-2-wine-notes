const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const typesCtrl = require('../controllers/types')

router.get('/wines/:id/types', typesCtrl.show)

// router.get('/new', ensureLoggedIn, typesCtrl.new)

// router.get('/:id', typesCtrl.show)

// router.post('/', ensureLoggedIn, typesCtrl.create)

module.exports = router



// const express = require('express')
// const router = express.Router()
// const ticketsCtrl = require('../controllers/tickets')

// //GET /tickets/new 
// router.get('/flights/:id/tickets/new', ticketsCtrl.new)

// router.post('/flights/:id/tickets', ticketsCtrl.create)

// module.exports = router