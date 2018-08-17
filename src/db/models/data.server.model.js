const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
})

const Data = mongoose.model('Data', DataSchema)
module.exports = Data
