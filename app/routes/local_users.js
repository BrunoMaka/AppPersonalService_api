const express = require('express');
const router = express.Router();
const LocalUser = require('../models/local_user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

router.post('/register', async (req, res) => {
  const { localname, email, password } = req.body;
  const local_user = new LocalUser({ localname, email, password });

  try {
    await local_user.save();
    res.status(200).json(local_user);
  } catch (error) {
    res.status(500).json({error: "Error registering new local user please try again."});
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let local_user = await LocalUser.findOne({ email })
    if (!local_user) {
      res.status(401).json({error: 'Incorrect email or password'});
    } else {
      local_user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({error: 'Incorrect email or password2'});
        } else {
          const token = jwt.sign({email}, secret, { expiresIn: '10d' });
          res.json({local_user: local_user, token: token});
        } 
      });     
    }


  } catch (error) {
    res.status(500).json({error: 'Internal error please try again'});
  }
});

module.exports = router;
