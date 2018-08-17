const express = require('express')
const router = express.Router()
const Widget = require('../db/models/widget.server.model')
const payloadJSON = require('../functions').payloadJSON
// const util = require('util')

//  POST save widget
router.post('/save', (req, res, next) => {
  const widgetData = {
    name: req.body.name,
    design: req.body.design,
    functions: req.body.functions,
    scheme: req.body.scheme,
    format: req.body.format,
    coords: req.body.coords
  }

  Widget.create(widgetData, (err, widget) => {
    if (err) {
      console.log(err)
      return next(err)
    } else {
      return res.status(201).json(payloadJSON({message: `Widget ${req.body.name} successfully saved!`}))
    }
  })
})

//  POST load widget
router.post('/load', (req, res, next) => {
  Widget.find({}, (err, widgets) => {
    if (err) return next(err)

    res.status(200).json(payloadJSON({widgets}))
  })
})

//  POST delete widget way one
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id
  Widget.findOne({_id: id}, (err, widget) => {
    if (err) return next(err)
    if (widget) {
      Widget.remove({_id: id}, (err, widget) => {
        if (err) return next(err)

        res.status(200).json(payloadJSON({message: `Widget ID: ${id} is successfully deleted!`}))
      })
    } else {
      res.status(404).json(payloadJSON({message: `Widget ID: ${id} not found!`}))
    }
  })
})

//  POST delete widget way two
router.post('/delete', (req, res, next) => {
  if (!req.body._id) {
    let error = new Error('Missing field ID in request!')
    error.status = 412
    return next(error)
  }

  const id = req.body._id
  Widget.findOne({_id: id}, (err, widget) => {
    if (err) return next(err)
    if (widget) {
      Widget.remove({_id: id}, (err, widget) => {
        if (err) return next(err)

        res.status(200).json(payloadJSON({message: `Widget ID: ${id} is successfully deleted!`}))
      })
    } else {
      res.status(404).json(payloadJSON({message: `Widget ID: ${id} not found!`}))
    }
  })
})

//  POST delete all widgets
router.post('/deleteall', (req, res, next) => {
  Widget.find({}, (err, widgets) => {
    if (err) return next(err)

    if (widgets.length > 0) {
      Widget.remove({}, (err, widgets) => {
        if (err) return next(err)

        res.status(200).json(payloadJSON({message: `All widgets successfully deleted!`}))
      })
    } else {
      res.status(404).json(payloadJSON({message: `No widgets in database!`}))
    }
  })
})

module.exports = router
