const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wine Notes' })
})

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // prompt: 'select_account',
  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/wines/index',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router
