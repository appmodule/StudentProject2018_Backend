const EventEmitter = require('events')

class SensorObserver extends EventEmitter {
}

const sensorObserver = new SensorObserver()

module.exports = sensorObserver
