const express = require('express')
const router = express.Router()
const chalk = require('chalk')
const Connection = require('../mqtt/connection')
// const util = require('util')

let jobs = []
let connectedFlag = false

let listener = {
  subscribes: [
    'time',
    'bla'
  ],
  onError: (err) => {
    console.log(chalk.red(err + ''))
  },
  onMessage: (topic, msg) => {
    if (listener.subscribes.includes(topic)) {
      let convertedMessage = JSON.parse(msg.toString())
      try {
        jobs[convertedMessage.id].onSuccess(convertedMessage)
      } catch (error) {
        console.error(error)
      }
    }
  },
  onConnect: (connack) => {
    console.log(chalk.bgGreen('Connected.'))
    connectedFlag = true
    doJobs()
  },
  onClose: () => {
    console.log(chalk.bgRed('Closed.'))
    connectedFlag = false
  },
  onReconnect: () => {
    connectedFlag = false
    console.log(chalk.bgYellow('Reconnect...'))
  },
  onOffline: () => {
    connectedFlag = false
    console.log(chalk.bgRed('Offline.'))
  },
  onEnd: () => {
    connectedFlag = false
    console.log(chalk.bgMagenta('End.'))
  },
  onPacketsend: (packet) => {
    //  do something with packet
  },
  onPacketreceive: (packet) => {
    //  do something with packet
  }
}

let conn = Connection.getInstance(listener)

function doJobs () {
  if (Object.keys(jobs).length > 0) {
    Object.keys(jobs).forEach((key) => {
      if (connectedFlag === true) {
        jobs[key].func()
      }
    })
  }
}

// router.post('/send', (req, res, next) => {
//   /*
//     Validation
//   */
//   let name = req.body.name
//   if (typeof name !== 'string') {
//     return res.status(400).json({message: 'Name must be a string!'})
//   }

//   let key = 'job_' + Math.random().toString(36).substr(2, 9)
//   let job = {
//     key: key,
//     req: req,
//     res: res,
//     next: next,
//     func: (job) => {
//       let message = {
//         id: key,
//         time: 'Current time is: ' + new Date()
//       }
//       let bufferedMessage = Buffer.from(JSON.stringify(message))
//       conn.publish('time', bufferedMessage)
//     },
//     onSuccess: (msg) => {
//       job.res.setHeader('Content-Type', 'application/json')
//       job.res.send(msg)
//       delete jobs[key]
//     }
//   }

//   jobs[job.key] = job
//   doJobs()
// })

// router.post('/disconnect', (req, res, next) => {
//   conn.disconnect()
//   res.send('Disconnected!')
// })

module.exports = router
