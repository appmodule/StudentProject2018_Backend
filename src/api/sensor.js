const express = require('express')
const router = express.Router()
const Sensor = require('../db/models/sensor.server.model')
const payloadJSON = require('../functions').payloadJSON

//  POST load
router.post('/load', (req, res, next) => {
  Sensor.find({}, (err, sensors) => {
    if (err) return next(err)

    res.status(200).json(payloadJSON({sensors}))
  })
})

module.exports = router
