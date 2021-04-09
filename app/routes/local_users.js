const express = require('express');
const router = express.Router();
const LocalUser = require('../models/local_user.js');

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

module.exports = router;
