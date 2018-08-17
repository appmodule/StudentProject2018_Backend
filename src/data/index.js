const Sensor = require('../db/models/sensor.server.model')
// const util = require('util')
const MQTTConnection = require('../mqtt/connection')
const sensorObserver = require('../data/sensorObserver')
const chalk = require('chalk')
const Data = require('../db/models/data.server.model')

let listener = {
  subscribes: [],
  onError: (err) => {
    console.log(chalk.red(err + ''))
  },
  onMessage: (topic, msg) => {
    if (listener.subscribes.includes(topic)) {
      let convertedMessage = JSON.parse(msg.toString())
      try {
        let newData = {topic: topic, data: convertedMessage}
        Data.create(newData, (err) => {
          if (err) {
            console.log(err)
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  onConnect: (connack) => {
    console.log(chalk.bgGreen('Connected.'))
    resubscribe()
  },
  onClose: () => {
    console.log(chalk.bgRed('Closed.'))
  },
  onReconnect: () => {
    console.log(chalk.bgYellow('Reconnect...'))
    resubscribe()
  },
  onOffline: () => {
    console.log(chalk.bgRed('Offline.'))
  },
  onEnd: () => {
    console.log(chalk.bgMagenta('End.'))
  },
  onPacketsend: (packet) => {
    //  do something with packet
  },
  onPacketreceive: (packet) => {
    //  do something with packet
  }
}

let conn = MQTTConnection.getInstance(listener)

function resubscribe () {
  Sensor.find((err, sensors) => {
    if (err) {
      console.log(err)
    } else {
      sensors.map(sensor => {
        listener.subscribes.push(sensor.topic)
        conn.subscribe(sensor.topic)
      })
    }
  })
}

sensorObserver.on('sensor-change', () => {
  resubscribe()
})
