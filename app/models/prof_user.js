//CRIAR MÉTODO PARA ADICIONAR LOCAL VINCULADO AO PROFISSIONAL

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var profUserSchema = new mongoose.Schema({
    firstname: {
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

    locals_affiliate: [
        {
        local: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LocalUser',
            default: null            
        }
    }]
});

profUserSchema.pre('save', function (next) {
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

profUserSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}



module.exports = mongoose.model('ProfUser', profUserSchema);