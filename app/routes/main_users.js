const express = require('express');
const router = express.Router();
const MainUser = require('../models/main_user.js');

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

module.exports = router;
