const mongoose = require('mongoose')

const HOST = require('../../env.json').mongodb.host
const DB = require('../../env.json').mongodb.db

const options = {
  useNewUrlParser: true
}

let instance

class Meerkat {
  constructor () {
    if (instance) {
      return instance
    }

    mongoose.connect('mongodb://' + HOST + '/' + DB, options)
    instance = mongoose

    return instance
  }
}

module.exports = new Meerkat()
