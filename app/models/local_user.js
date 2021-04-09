const mongoose = require('mongoose');

var localUserSchema = new mongoose.Schema({
    localname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

  module.exports = mongoose.model('LocalUser', localUserSchema);