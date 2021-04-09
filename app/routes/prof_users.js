const express = require('express');
const router = express.Router();
const ProfUser = require('../models/prof_user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const prof_user = new ProfUser({ firstname, lastname, email, password });

  try {
    await prof_user.save();
    res.status(200).json(prof_user);
  } catch (error) {
    res.status(500).json({error: "Error registering new professional user please try again."});
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let prof_user = await ProfUser.findOne({ email })
    if (!prof_user) {
      res.status(401).json({error: 'Incorrect email or password'});
    } else {
      prof_user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({error: 'Incorrect email or password'});
        } else {
          const token = jwt.sign({email}, secret, { expiresIn: '10d' });
          res.json({prof_user: prof_user, token: token});
        } 
      });     
    }


  } catch (error) {
    res.status(500).json({error: 'Internal error please try again'});
  }
});

module.exports = router;
