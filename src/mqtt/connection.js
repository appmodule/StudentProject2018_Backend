const chalk = require('chalk')
const mqtt = require('mqtt')

const PORT = require('../../env.json').mqtt.port
const HOST = require('../../env.json').mqtt.host

const options = {
  port: PORT,
  host: HOST,
  keepalive: 3,
  reconnectPeriod: 0
}

let instance

class Connection {
  constructor () {
    if (instance) {
      return instance
    }

    this.connection = mqtt.connect(options)
    this.listener = []

    const reconnection = () => {
      setInterval(() => {
        // console.log('\n' + chalk.magenta('MQTT ') + chalk.blue('reconnection says:'))  //  commented because annoying console logging
        if (!this.connection.connected) {
          console.log(chalk.bgYellow('Try to recconect...'))
          this.connection.reconnect()
        /* handle success or failed recconection */
        } else {
          // console.log(chalk.bgBlue('It\'s allredy connected.'))
        }
      }, 5000)
    }

    setTimeout(() => {
      reconnection()
    }, 5000)

    instance = this
    return instance
  }

  getInstance (listener) {
    let index = this.listener.length
    this.listener[index] = listener

    this.connection.on('error', (error) => {
      if (error.message === ('Cannot parse topic')) { // Because smoreni error!
        return
      }
      this.listener[index].onError(error)
    })
    this.connection.on('message', (topic, message) => {
      this.listener[index].onMessage(topic, message)
    })
    this.connection.on('connect', (connack) => {
      this.listener[index].onConnect(connack)
    })
    this.connection.on('offline', () => {
      this.listener[index].onOffline()
    })
    this.connection.on('close', () => {
      this.listener[index].onClose()
    })
    this.connection.on('reconnect', () => {
      this.listener[index].subscribes.forEach(sub => {
        this.connection.subscribe(sub)
      })
      this.listener[index].onReconnect()
    })
    this.connection.on('end', () => {
      this.listener[index].onEnd()
    })
    this.connection.on('packetsend', (packet) => {
      this.listener[index].onPacketsend(packet)
    })
    this.connection.on('packetreceive', (packet) => {
      this.listener[index].onPacketreceive(packet)
    })

    this.listener[index].subscribes.forEach(sub => {
      this.connection.subscribe(sub)
    })

    return instance
  }

  connect () {
    return this.connection
  }

  disconnect () {
    this.connection.end()
    console.log('MQTT -> ' + chalk.bgRed('Desconnected...'))
  }

  subscribe (topic, qos = 0) {
    this.connection.subscribe(topic, {
      qos: qos
    })
  }

  publish (topic, message, qos = 0) {
    this.connection.publish(topic, message, {
      qos: qos
    })
  }
}

module.exports = new Connection()
