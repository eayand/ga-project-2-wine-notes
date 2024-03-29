const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')


require('dotenv').config()
require('./config/database')
require('./config/passport')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const homeRouter = require('./routes/home')
const winesRouter = require('./routes/wines')
const typesRouter = require('./routes/types')
const makersRouter = require('./routes/makers')
const notesRouter = require('./routes/notes')
const vendorsRouter = require('./routes/vendors')


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
  res.locals.user = req.user
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/home', homeRouter)
app.use('/wines', winesRouter)
app.use('/', typesRouter)
app.use('/', makersRouter)
app.use('/', notesRouter)
app.use('/', vendorsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
