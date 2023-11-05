const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
      type: Array,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: Array,
        required: true
    }
}, {
    timestamps: true
}) ;

const User = mongoose.model('User',userSchema);

module.exports = User;  