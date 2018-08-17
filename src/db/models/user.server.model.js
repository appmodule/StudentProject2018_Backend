const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// authenticate input against database
UserSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        let error = new Error('User not found.')
        error.status = 401
        return callback(error)
      }
      // bcrypt.compare(password, user.password, (err, result) => {
      //   if (result === true) {
      //     return callback(null, user)
      //   } else {
      //     return callback()
      //   }
      // })
      if (password === user.password) {
        return callback(null, user)
      } else {
        return callback()
      }
    })
}

// hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//   var user = this
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash
//     next()
//   })
// })

var User = mongoose.model('User', UserSchema)
module.exports = User
