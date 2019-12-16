import mongoose from 'mongoose';

const refugeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true 
  },
  lastName: {
    type: String,
    required: true 
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ['male', 'female', 'other']
    },
    default :'male'
  },
  age: {
    type: Number,
    required: true,
  },
  help: {
    type: Array,
    required: true,
  },
  phoneNumber: {
    type: Number,
    minlength: 8,
    manlength: 15
  },
  country: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registeredDate: {
    type: Date,
    required: true,
    default : Date.now
  },
  otherInformation: {
    type: String
  },
  profileImage: {
    type: String
  },
  description: {
    type: String
  },
  helpStatus:{
    type: Boolean,
    "default": false
  },
  helpVolunteer:{
    type:  String,
    }
});

module.exports = mongoose.model('Refugee', refugeeSchema);
