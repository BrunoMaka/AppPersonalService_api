const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var mainUserSchema = new mongoose.Schema({
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

mainUserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10,
            (err, hashedPassword) => {
                if (err)
                    next(err);
                else {
                    this.password = hashedPassword;
                    next();
                }
            }
        )
    }
})

module.exports = mongoose.model('MainUser', mainUserSchema);