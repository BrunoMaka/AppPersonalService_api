const express = require('express');
const router = express.Router();
const MainUser = require('../models/main_user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const main_user = new MainUser({ firstname, lastname, email, password });

  try {
    await main_user.save();
    res.status(200).json(main_user);
  } catch (error) {
    res.status(500).json({error: "Error registering new main user please try again."});
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let main_user = await MainUser.findOne({ email })
    if (!main_user) {
      res.status(401).json({error: 'Incorrect email or password'});
    } else {
      main_user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({error: 'Incorrect email or password'});
        } else {
          const token = jwt.sign({email}, secret, { expiresIn: '10d' });
          res.json({main_user: main_user, token: token});
        } 
      });     
    }


  } catch (error) {
    res.status(500).json({error: 'Internal error please try again'});
  }
});

module.exports = router;
