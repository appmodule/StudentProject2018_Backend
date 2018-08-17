const express = require('express')
const router = express.Router()
const Sensor = require('../db/models/sensor.server.model')
const payloadJSON = require('../functions').payloadJSON
const util = require('util')
const sensorObserver = require('../data/sensorObserver')

// router.post('/mnf/:guid/:sensor/on', (req, res, next) => {
//     let paramGuid = req.params.guid
//     let paramType = req.params.sensor

//     const newSensor = new Sensor({guid: paramGuid, type: paramType})

//     Sensor.findOne({ guid: paramGuid, type: paramType})
//             .exec((err, sensor) => {
//                 if(err) return next(err)
//                 // if there is no sensor in db, we insert one
//                 if(!sensor) {

//                     newSensor.save((err) => {
//                         if(err) return next(err)
//                          res.status(201).send("Sensor added")
//                     })
//                 } else {
//                     res.status(409).send("Sensor is already on")
//                 }

//             })

// })

// router.post('/mnf/:guid/:sensor/off', (req, res, next) => {
//     let paramGuid = req.params.guid
//     let paramType = req.params.sensor

//     Sensor.findOne({ guid: paramGuid, type: paramType})
//             .exec((err, sensor) => {
//                 if(err) return next(err)

//                 if(sensor) {
//                     Sensor.deleteOne({ guid: paramGuid})
//                         .exec((err) => {
//                             if(err) return next(err)

//                             res.status(204).send("Sensor turned off")
//                         })
//                 } else {
//                     res.status(404).send("There is no active sensor")
//                 }
//             })

// })

//  because iOS has this manifest to avoid sending 404
router.post('/mnf/:guid/:sensor/off', (req, res, next) => {
  res.send()
})

router.post('/mnf/:guid/:sensor', (req, res, next) => {
  console.log('\n' + util.inspect(req.body) + '\n')
  let name = req.params.sensor
  let topic = 'ssiot/data/' + req.params.guid + '/' + req.params.sensor
  let format = req.body

  Sensor.findOne({topic: topic})
    .exec((err, sensor) => {
      if (err) return next(err)

      if (sensor) {
        Sensor.update({topic: topic}, {$set: format}, (err, sensor) => {
          if (err) return next(err)
          sensorObserver.emit('sensor-change')
          return res.status(204).json(payloadJSON({message: `Update successfully: ${sensor}`}))
        })
      } else {
        let newSensor = {name: name, topic: topic, format: format}
        Sensor.create(newSensor, (err) => {
          if (err) return next(err)
          sensorObserver.emit('sensor-change')
          res.status(201).json(payloadJSON({message: `Sensor manifested successfully: ${newSensor}`}))
        })
      }
    })
})

module.exports = router
