const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required: false,

  },
  contact: {
    type: String,
    required: false,
    trim: true
  },

  firstname: {
    type: String,
    required: false,
    trim: true
  },
  lastname: {
    type: String,
    required: false,
    trim: true
  },
  contact: {
    type: String,
    required: false,
    trim: true
  },
  city: {
    type: String,
    required: false,
    trim: true
  },

  zip: {
    type: String,
    required: false,
    trim: true
  },
  state: {
    type: String,
    required: false,
    trim: true
  },
  favProperties:[
    {
      type: String,
      required: false
     
    }
  ]


})

const User = mongoose.model('User', UserSchema)
 
module.exports = User