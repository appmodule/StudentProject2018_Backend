const express = require('express')
const router = express.Router()
const User = require('../db/models/user.server.model')
// const chalk = require('chalk')
const util = require('util')
// const uuidv4 = require('uuid/v4')
const payloadJSON = require('../functions').payloadJSON

router.post('/create', (req, res, next) => {
  if (req.body.username && req.body.password) {
    const userData = {
      username: req.body.username,
      password: req.body.password
    }

    User.findOne({username: req.body.username}, (err, user) => {
      if (err) return next(err)
      if (user) {
        let error = new Error('An account with this username is already taken!')
        error.status = 409

        return next(error)
      } else {
        User.create(userData, (err, user) => {
          if (err) {
            return next(err)
          } else {
            user.save()
              .then(() => {
                req.session.authenticated = true
                req.session.userId = user._id
                return res.status(201).json(payloadJSON({message: `User ${user.username} stored to MongoDB!`}))
              })
          }
        })
      }
    })
  }
})

//  POST login
router.post('/login', (req, res, next) => {
  console.log(util.inspect(req.body))
  User.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error || !user) {
      let err = new Error('Wrong username or password.')
      err.status = 401
      return next(err)
    } else if (req.session.authenticated) {
      return res.status(208).json(payloadJSON({message: 'Already logged in!'}))
    } else {
      try {
        req.session.authenticated = true
        const userGuid = user._id // uuidv4()
        req.session.guid = userGuid
        return res.status(202).json(payloadJSON({message: 'Successfully logged in!', guid: userGuid}))
      } catch (error) {
        console.log(error)
      }
    }
  })
})

// POST /logout
router.post('/logout', (req, res, next) => {
  console.log(util.inspect(req.session))
  if (req.session) {
    if (req.session.authenticated) {
      delete req.session.authenticated
      delete req.session.guid
      return res.status(200).json(payloadJSON({message: `Successfully logged out!`}))
    }
  }
})

module.exports = router
