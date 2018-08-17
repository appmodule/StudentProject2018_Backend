const express = require('express')
const router = express.Router()
const LayoutWidgets = require('../db/models/layout-widgets.server.model')
const payloadJSON = require('../functions').payloadJSON

router.post('/save', function (req, res, next) {
  const widgets = req.body.widgets
  const name = req.body.name

  LayoutWidgets.findOne({name: name}, (err, layout) => {
    if (err) return next(err)

    if (layout) {
      LayoutWidgets.remove({name: name}, (err, layout) => {
        if (err) return next(err)
      })
    }

    let layoutToSave = { name: name, widgets: widgets }
    LayoutWidgets.create(layoutToSave, function (err, layout) {
      if (err) return next(err)

      return res.status(200).json(payloadJSON({message: `Saved successfully: ${layout.name}`}))
    })
  })
})

router.post('/load', (req, res, next) => {
  let name = req.body.name

  LayoutWidgets.findOne({name}, function (err, layout) {
    if (err) return next(err)

    res.status(200).json(layout)
  })
})

module.exports = router
