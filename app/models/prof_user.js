const mongoose = require('mongoose');

var profUserSchema = new mongoose.Schema({
    fisrtname: {
        type: String,
        required: true
    },

    lastname: {
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

  module.exports = mongoose.model('ProfUser', profUserSchema);