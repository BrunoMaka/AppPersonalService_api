var express = require('express');
var router = express.Router();
const ServiceClass = require('../models/service_class.js');
const withAuth = require('../middlewares/main_user_auth');

router.post('/:id', withAuth, async (req, res) => {
  const { class_type, isRemote, class_date, class_time } = req.body;
  const { id } = req.params;
  var service_class = new ServiceClass({
    class_type: class_type, 
    isRemote: isRemote, 
    class_date:class_date, 
    class_time:class_time,
    author: req.main_user._id, 
    professional: id});

  try {
    await service_class.save();
    res.json(service_class);
  } catch (error) {
    res.status(401).send(error);
  }
  });

module.exports = router;
