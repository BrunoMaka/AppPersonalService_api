var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Usuário COM O LOCAL que vai usar o serviço');
});

module.exports = router;
