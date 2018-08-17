const mongoose = require('mongoose')

var WidgetSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  format: {
    type: Object,
    required: true
  },
  design: {
    type: String,
    required: true
  },
  coords: Object,
  functions: {
    type: Object,
    required: true
  },
  scheme: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
})

var Widget = mongoose.model('Widget', WidgetSchema)
module.exports = Widget
