var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/AppPersonalService', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
).then(() => console.log('connection succesful - mongoose & mondodb'))
  .catch((err) => console.error(err));