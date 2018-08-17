var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var cors = require('cors')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')(session)

//    MongoDB Class
require('./src/db/meerkat')
require('./src/data')

//  Auth check midlleware
function checkAuth (req, res, next) {
  let notSecuredAPI = [
    '/user/login',
    '/user/create',
    '/'
  ]
  if (notSecuredAPI.includes(req.url)) {
    return next()
  }
  if ((!req.session || !req.session.authenticated)) {
    let err = new Error('Not authenticated!')
    err.status = 403
    return next(err)
  }

  next()
}

//  routes & APIs
const indexRouter = require('./routes/index')
const mqttAPI = require('./src/api/mqtt')
const userAPI = require('./src/api/user')
const ssiotAPI = require('./src/api/ssiot')
const widgetAPI = require('./src/api/widget')
const layoutAPI = require('./src/api/layout')
const sensorAPI = require('./src/api/sensor')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'ssiioott',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 3 // 1 week
  },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(checkAuth)
app.use('/', indexRouter)
app.use('/mqtt', mqttAPI)
app.use('/user', userAPI)
app.use('/ssiot', ssiotAPI)
app.use('/widget', widgetAPI)
app.use('/layout', layoutAPI)
app.use('/sensor', sensorAPI)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // return error JSON
  res.status(err.status || 500)
  res.json({
    error: true,
    errorBody: {
      message: err.message,
      status: res.locals.error.status,
      stack: res.locals.error.stack
    },
    body: {}
  })
})

module.exports = app
