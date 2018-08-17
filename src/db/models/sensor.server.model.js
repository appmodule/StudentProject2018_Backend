const mongoose = require('mongoose')

var SensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  format: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
})

var Sensor = mongoose.model('Sensor', SensorSchema)
module.exports = Sensor
