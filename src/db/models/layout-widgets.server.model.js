const mongoose = require('mongoose')

var LayoutWidgetsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  widgets: [
    {
      name: String,
      topic: String,
      design: String,
      scheme: Object,
      format: Object,
      functions: Object,
      lastData: Object,
      coords: Object,
      mqttConnection: Object
    }
  ]
})

var LayoutWidgets = mongoose.model('LayoutWidgets', LayoutWidgetsSchema)
module.exports = LayoutWidgets
