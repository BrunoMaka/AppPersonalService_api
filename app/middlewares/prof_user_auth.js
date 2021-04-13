require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken')
const ProfUser = require('../models/prof_user.js');


const prof_withAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({error: 'Unauthorized: No token provided'});
      } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
              req.email = decoded.email;
              ProfUser
              .findOne({email: decoded.email })
              .then(prof_user => {
                  req.prof_user = prof_user
                  next();
              }).catch(err => {
                  res.status(401).send(err);
              })
            
            }
      });      
    }
};

module.exports = prof_withAuth;