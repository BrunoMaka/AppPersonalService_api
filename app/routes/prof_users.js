var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Profissional que vai prestar o serviço');
});

module.exports = router;
