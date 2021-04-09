const express = require('express');
const router = express.Router();
const ProfUser = require('../models/prof_user.js');

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

module.exports = router;
