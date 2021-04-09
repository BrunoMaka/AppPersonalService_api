const mongoose = require('mongoose');

var serviceClassSchema = new mongoose.Schema({
    //INCLUIR TODAS AS PROPRIEDADES QUE UMA CLASSE/SERVIÇO TERÁ
    class_type: String,
    isRemote: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainUser',
        required: true
      }
  });

  module.exports = mongoose.model('ServiceClass', serviceClassSchema);