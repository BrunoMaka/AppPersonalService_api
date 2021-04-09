const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

localUserSchema.pre('save', function (next) {
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



module.exports = mongoose.model('LocalUser', localUserSchema);