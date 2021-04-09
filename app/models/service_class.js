const mongoose = require('mongoose');

var serviceClassSchema = new mongoose.Schema({
    //INCLUIR TODAS AS PROPRIEDADES QUE UMA CLASSE/SERVIÇO TERÁ
    class_type: String,
    isRemote: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    class_date: {type: Date},
    class_time: {type: Date},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainUser',
        required: true
      },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfUser',
        required: true
    }
  });

  module.exports = mongoose.model('ServiceClass', serviceClassSchema);